import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../../actions/orderActions";
import CheckoutSteps from "../../components/checkout/CheckoutSteps";
import Message from "../../components/message/Message";
import "./placeOrder.css";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, paymentMethod } = cart;

  // Calculate Prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
  );

  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 10);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));

  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push("/order/" + order._id);
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="poContainer">
        <div className="poCol">
          <div className="poListGroup">
            <div className="poListItem">
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {shippingAddress.address}, {shippingAddress.city},{" "}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
            </div>
            <div className="poListItem">
              <strong>Payment Method:</strong>
              <p>{paymentMethod}</p>
            </div>
            <div className="poListItem">
              <h3>Order Items:</h3>
              {cartItems.length === 0 ? (
                <Message text="Your cart is empty" />
              ) : (
                <div className="poListGroup">
                  {cartItems.map((item, index) => (
                    <div key={index} className="poListItem">
                      <div className="poRow">
                        <div className="poCol">
                          <img src={item.image} alt={item.name} className="poImg" />
                        </div>
                        <div className="poCol">
                          <Link className="poLink" to={"/product/" + item.product}>
                            {item.name}
                          </Link>
                        </div>
                        <div className="poCol">
                          {item.qty} x {item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="poCol">
          <div className="poCard">
            <div className="poCardListGroup">
              <div className="poCardListItem">
                <h3>Order Summary</h3>
              </div>
              <div className="poCardListItem">
                <div className="poCardRow">
                  <div>Items:</div>
                  <div>${cart.itemsPrice}</div>
                </div>
              </div>
              <div className="poCardListItem">
                <div className="poCardRow">
                  <div>Shipping:</div>
                  <div>${cart.shippingPrice}</div>
                </div>
              </div>
              <div className="poCardListItem">
                <div className="poCardRow">
                  <div>Tax:</div>
                  <div>${cart.taxPrice}</div>
                </div>
              </div>
              <div className="poCardListItem">
                <div className="poCardRow">
                  <div>TOTAL:</div>
                  <div>${cart.totalPrice}</div>
                </div>
              </div>
              <div className="poCardListItem">
                {error && <Message danger text={error} />}
              </div>
              <div className="poCardListItem">
                <button
                  type="button"
                  className={cartItems === 0 ? "poButton inactive" : "poButton"}
                  disabled={cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
