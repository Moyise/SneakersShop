import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../../actions/cartActions";
import CheckoutSteps from "../../components/checkout/CheckoutSteps";
import "./shipping.css";

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingAddress({ address, city, postalCode, country }));

    history.push("/payment");
  };

  return (
    <>
      <CheckoutSteps step1 step2 />
      <div className="spContainer">
        <form className="form" onSubmit={submitHandler}>
          <h1 className="spTitle">Shipping</h1>
          <div className="formGroup">
            <input
              type="text"
              placeholder=" "
              value={address}
              required
              className="formInput"
              onChange={(e) => setAddress(e.target.value)}
            />
            <label className="formLabel">Address</label>
          </div>

          <div className="formGroup">
            <input
              type="text"
              placeholder=" "
              value={city}
              required
              className="formInput"
              onChange={(e) => setCity(e.target.value)}
            />
            <label className="formLabel">City</label>
          </div>

          <div className="formGroup">
            <input
              type="text"
              placeholder=" "
              value={postalCode}
              required
              className="formInput"
              onChange={(e) => setPostalCode(e.target.value)}
            />
            <label className="formLabel">PostalCode</label>
          </div>

          <div className="formGroup">
            <input
              type="text"
              placeholder=" "
              value={country}
              required
              className="formInput"
              onChange={(e) => setCountry(e.target.value)}
            />
            <label className="formLabel">Country</label>
          </div>

          <input type="submit" className="formButton" value="Continue" />
        </form>
      </div>
    </>
  );
};

export default ShippingScreen;
