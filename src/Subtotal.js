import React from "react";
import "./Subtotal.css";
//import CurrencyFormat from 'react-currency-format';
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./reducer";

function Subtotal() {
  const [{ basket }, dispatch] = useStateValue();
  const dollarUS = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    decimalScale: 2,
  });

  return (
    <div className="subtotal">
      <>
        <p>
          Subtotal ({basket.length} items): <strong>{dollarUS.format(getBasketTotal(basket))}</strong>
        </p>
        <small className="subtotal__gift">
          <input type="checkbox" />
          This order contains a gift
        </small>
      </>

      <button> Proceed to Checkout </button>
    </div>
  );
}

export default Subtotal;
