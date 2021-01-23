import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";
import Loader from "../../components/loader/Loader";
import Message from "../../components/message/Message";
import "./register.css";

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);

  const { userInfo, loading, error } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, redirect, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      //DISPATCH_REGISTER
      dispatch(register(name, email, password));
    }
  };

  return (
    <>
      {message && <Message danger text={message} />}
      {error && <Message danger text={error} />}
      {loading && <Loader />}
      <div className="registerContainer">
        <form className="form" onSubmit={submitHandler}>
          <h1 className="formTitle">Sign Up</h1>

          <div className="formGroup">
            <input
              type="text"
              className="formInput"
              placeholder=" "
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
            <label className="formLabel">Name</label>
          </div>

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

          <div className="formGroup">
            <input
              type="password"
              className="formInput"
              placeholder=" "
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label className="formLabel">Confirm Password</label>
          </div>

          <input type="submit" className="formButton" value="Sign Up" />
          <p>Already Registered?</p>
          <Link to={redirect ? "/login?redirect=" + redirect : "/login"}>
            <h2 className="link">Sign In</h2>
          </Link>
        </form>
      </div>
    </>
  );
};

export default RegisterScreen;
