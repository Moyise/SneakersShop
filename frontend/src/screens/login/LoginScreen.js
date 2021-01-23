import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../actions/userActions";
import Loader from "../../components/loader/Loader";
import Message from "../../components/message/Message";
import "./login.css";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo, loading, error } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, redirect, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    //DISPATCH_LOGIN
    dispatch(login(email, password));
  };
  return (
    <>
      {error && <Message danger text={error} />}
      {loading && <Loader />}
      <div className="sample">
        <h4>Admin: ghost@gmail.com</h4>
        <h4>Password: 12345</h4>
      </div>
      <div className="loginContainer">
        <form className="form" onSubmit={submitHandler}>
          <h1 className="formTitle">Sign In</h1>

          <div className="formGroup">
            <input
              type="email"
              className="formInput"
              placeholder=" "
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="formLabel">Email</label>
          </div>

          <div className="formGroup">
            <input
              type="password"
              className="formInput"
              placeholder=" "
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="formLabel">Password</label>
          </div>

          <input type="submit" className="formButton" value="Sign In" />
          <p>New Customer?</p>
          <Link
            style={{ textDecoration: "none" }}
            to={redirect ? "/register?redirect=" + redirect : "/register"}
          >
            <h2 className="link">Register</h2>
          </Link>
        </form>
      </div>
    </>
  );
};

export default LoginScreen;
