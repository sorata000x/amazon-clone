import React from 'react'
import './Checkout.css';
import Subtotal from './Subtotal';

function Checkout() {
  return (
    <div className='checkout'>
      <div className='checkout-left'>
        <div>
            <h2 className='checkout__title'> Your Shopping Basket</h2>

            {/* BasketItem */}
            {/* BasketItem */}
            {/* BasketItem */}
            {/* BasketItem */}
            {/* BasketItem */}
        </div>
      </div>
      <div className='checkout-right'>
        <Subtotal />
      </div>
    </div>
  )
}

export default Checkout
