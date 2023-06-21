import React, { useState, useEffect } from 'react';
import './Payment.css';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { getBasketTotal } from './reducer';
import axios from './axios';
import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore'

function Payment() {
  const [{basket, user}, dispatch] = useStateValue();
  const navigate = useNavigate();
  const dollarUS = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    decimalScale: 2,
  });

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer

    const getClientSecret = async () => {
      await axios({
        method: 'post',
        // Stripe expects the total in a currencies subunits
        url: `/payment/create?total=${getBasketTotal(basket) * 100}`
      }).then(response => {
        setClientSecret(response.data.clientSecret)
      }).catch(err => {
        console.log('err')
      });
    }

    getClientSecret();
  }, [basket])

  console.log('The secrete is >>> ', clientSecret)

  const handleSubmit = async(event) => {
    // stripe
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    }).then(async ({ paymentIntent }) => {
      // paymentIntent = payment confirmation

      const paymentRef = doc(db, "users", user?.uid, "orders", paymentIntent.id);

      await setDoc(paymentRef, {
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });

      dispatch({
        type: 'EMPTY_BASKET'
      })

      setSucceeded(true);
      setError(null);
      setProcessing(false);

      navigate('/orders', { replace: true });
    })
  }

  const handleChange = event => {
    // Listen for changes in the CardElement
    // and display any errors as the customers types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  }
  
  return (
    <div className='payment'>
      <div className='payment__container'>
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>

        { /* Payment section - Delivery address */}
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Delivery Address</h3>
          </div>
          <div className='payment__address'>
            <p>{user?.email}</p>
            <p>React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        { /* Payment section - Review items */}
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Review Items and delivery</h3>
          </div>
          <div className='payment__items'>
            {basket.map((item, i) => (
              <CheckoutProduct
                key={i}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        { /* Payment section - Payment method */}
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Payment Method</h3>
          </div>
          <div className='payment__details'>
              {/* Stripe */}

              <form onSubmit={handleSubmit}>
                <CardElement onChange={handleChange}/>

                <div className='payment__priceContainer'>
                  <h3>Order Total: {dollarUS.format(getBasketTotal(basket))}</h3>
                  <button disabled={processing || disabled || succeeded}>
                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                  </button>
                </div>

                {/* Error */}
                {error && <div>{error}</div>}
              </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
