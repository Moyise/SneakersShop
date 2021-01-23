import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/loader/Loader";
import Message from "../../../components/message/Message";
import { getUserDetails, updateUser } from "../../../actions/userActions";
import { USER_UPDATE_RESET } from "../../../constants/userConstants";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import "./userEdit.css";

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading, error } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/admin/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, user, userId, successUpdate, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <>
      <div className="ueContainer">
        <Link to="/admin/userlist">
          <KeyboardReturnIcon className="icon" />
        </Link>

        {loadingUpdate && <Loader />}
        {errorUpdate && <Message danger text={errorUpdate} />}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message danger text={error} />
        ) : (
          <div className="ueRow">
            <form onSubmit={submitHandler} className="form">
              <h1 className="formTitle">Edit User</h1>
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
                  disabled={user.email === "moyisemr@gmail.com"}
                />
                <label className="formLabel">Email</label>
              </div>

              <div className="formGroup">
                <input
                  type="checkbox"
                  id="check"
                  disabled={email === "moyisemr@gmail.com" || user._id === userInfo._id}
                  checked={isAdmin}
                  onChange={() => setIsAdmin(true)}
                />
                <label htmlFor="check" className="ueLabel">
                  Is Admin
                </label>
              </div>
              <div className="formGroup">
                <input
                  type="checkbox"
                  id="check"
                  className="checkbox"
                  disabled={email === "moyisemr@gmail.com" || user._id === userInfo._id}
                  checked={!isAdmin}
                  onChange={() => setIsAdmin(false)}
                />
                <label htmlFor="check" className="ueLabel">
                  Not Admin
                </label>
              </div>

              <button
                className={
                  email === "moyisemr@gmail.com" ? "ueButton disabled" : "ueButton"
                }
                type="submit"
                disabled={email === "moyisemr@gmail.com"}
              >
                Update
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default UserEditScreen;
