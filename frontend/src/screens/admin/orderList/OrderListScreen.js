import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/loader/Loader";
import Message from "../../../components/message/Message";
import { listOrders } from "../../../actions/orderActions";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import InfoIcon from "@material-ui/icons/Info";
import "./orderList.css";

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, userInfo, history]);

  return (
    <>
      <div className="olContainer">
        <h1>Orders</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message danger text={error} />
        ) : (
          <table className="olTable">
            <thead>
              <tr id="olHeader">
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>
                    <Link to={`/order/${order._id}`} className="olLink">
                      {order._id}
                    </Link>
                  </td>
                  <td>{order.user && order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.isPaid ? <CheckIcon /> : <ClearIcon />}</td>
                  <td>{order.isDelivered ? <CheckIcon /> : <ClearIcon />}</td>
                  <td>
                    <Link to={`/order/${order._id}`}>
                      <button className="olButton">
                        <InfoIcon />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default OrderListScreen;
