import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, payOrder, deliverOrder } from "../../actions/orderActions";
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from "../../constants/orderConstants";
import Loader from "../../components/loader/Loader";
import Message from "../../components/message/Message";
import "./order.css";

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };

      document.body.appendChild(script);
    };

    //dispatch(getOrderDetails(orderId));
    if (!order || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });

      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, order, successDeliver, history, userInfo]);

  const successPaymentHandler = (paymentResults) => {
    //console.log(paymentResults);
    dispatch(payOrder(orderId, paymentResults));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message danger text={error} />
  ) : (
    <>
      <h4 className="orderId">Order Id: {order._id}</h4>
      <div className="osContainer">
        <div className="osCol">
          <div className="osListGroup">
            <div className="osListItem">
              <h2>Shipping</h2>
              <p>Name: {order.user.name}</p>
              <p>
                <a href={"mailto:" + order.user.email} className="mailLink">
                  Email: {order.user.email}
                </a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message text={`Delivered At: ${order.deliveredAt}`} />
              ) : (
                <Message danger text="Not Delivered" />
              )}
            </div>
            <div className="osListItem">
              <h3>Payment Method:</h3>
              <p>Method: {order.paymentMethod}</p>
              {order.isPaid ? (
                <Message text={`Paid On: ${order.paidAt}`} />
              ) : (
                <Message danger text="Not Paid" />
              )}
            </div>
            <div className="osListItem">
              <h3>Order Items:</h3>
              {order.orderItems.length === 0 ? (
                <Message text="Your cart is empty" />
              ) : (
                <div className="osListGroup">
                  {order.orderItems.map((item, index) => (
                    <div key={index} className="osListItem">
                      <div className="osRow">
                        <div className="osCol">
                          <img src={item.image} alt={item.name} />
                        </div>
                        <div className="osCol">
                          <Link className="osLink" to={"/product/" + item.product}>
                            {item.name}
                          </Link>
                        </div>
                        <div className="osCol">
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
        <div className="osCol">
          <div className="osCard">
            <div className="osCardListGroup">
              <div className="osCardListItem">
                <h3>Order Summary</h3>
              </div>
              <div className="osCardListItem">
                <div className="osCardRow">
                  <div>Items:</div>
                  <div>${order.itemsPrice}</div>
                </div>
              </div>
              <div className="osCardListItem">
                <div className="osCardRow">
                  <div>Shipping:</div>
                  <div>${order.shippingPrice}</div>
                </div>
              </div>
              <div className="osCardListItem">
                <div className="osCardRow">
                  <div>Tax:</div>
                  <div>${order.taxPrice}</div>
                </div>
              </div>
              <div className="osCardListItem">
                <div className="osCardRow">
                  <div>TOTAL:</div>
                  <div>${order.totalPrice}</div>
                </div>
              </div>
              {!order.isPaid && (
                <div className="osCardListItem">
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      style={{ color: "blue" }}
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </div>
              )}
              {loadingDeliver && <Loader />}
              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <div className="osCardListItem">
                  <button className="osButton" onClick={deliverHandler}>
                    Mark as Delivered
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderScreen;
