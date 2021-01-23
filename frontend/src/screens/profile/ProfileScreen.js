import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserDetails, updateUserProfile } from "../../actions/userActions";
import { listMyOrders } from "../../actions/orderActions";
import Loader from "../../components/loader/Loader";
import Message from "../../components/message/Message";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import "./profile.css";

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading, error } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { orders, loading: loadingOrders, error: errorOrders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, userInfo, dispatch, user]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      //DISPATCH_UPDATE PROFILE
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <div className="pfContainer">
      <div className="pfCol">
        <h2>User Profile</h2>
        {message && <Message danger text={message} />}
        {error && <Message danger text={error} />}
        {success && <Message text="Profile Updated" />}
        {loading && <Loader />}
        <form className="pfForm" onSubmit={submitHandler}>
          <div className="pfFormGroup">
            <input
              type="text"
              className="pfFormInput"
              placeholder=" "
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className="pfFormLabel">Name</label>
          </div>

          <div className="pfFormGroup">
            <input
              type="text"
              className="pfFormInput"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="pfFormLabel">Email</label>
          </div>

          <div className="pfFormGroup">
            <input
              type="password"
              className="pfFormInput"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="pfFormLabel">Password</label>
          </div>

          <div className="pfFormGroup">
            <input
              type="password"
              className="pfFormInput"
              placeholder=" "
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label className="pfFormLabel">Confirm Password</label>
          </div>

          <input type="submit" className="pfFormButton" value="Update" />
        </form>
      </div>
      <div className="pfCol">
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message danger text={errorOrders} />
        ) : (
          <table className="prTable">
            <thead>
              <tr id="header">
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>
                    <Link to={"/order/" + order._id} className="orderLink">
                      {order._id}
                    </Link>
                  </td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.isPaid ? <CheckIcon /> : <ClearIcon />}</td>
                  <td>{order.isDelivered ? <CheckIcon /> : <ClearIcon />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;
