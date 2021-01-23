import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../../actions/cartActions";
import CheckoutSteps from "../../components/checkout/CheckoutSteps";
import "./payment.css";

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));

    history.push("/placeorder");
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <div className="pmContainer">
        <form className="form" onSubmit={submitHandler}>
          <h1>Payment Method</h1>
          <div className="formGroup">
            <h4>Select Method</h4>
            <div className="pmCol">
              <label className="radio">
                <input
                  type="radio"
                  id="PayPal"
                  name="paymentMethod"
                  value="PayPal"
                  checked
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                PayPal or Credit Card
                <span></span>
              </label>

              <label className="radio">
                <input
                  type="radio"
                  id="Stripe"
                  name="paymentMethod"
                  value="Stripe"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Stripe
                <span></span>
              </label>
            </div>
          </div>
          <input type="submit" className="formButton" value="Continue" />
        </form>
      </div>
    </>
  );
};

export default PaymentScreen;
