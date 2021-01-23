import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUsers } from "../../../actions/userActions";
import Loader from "../../../components/loader/Loader";
import Message from "../../../components/message/Message";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import "./userList.css";

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { users, loading, error } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      <h1 className="ulTitle">Users</h1>
      <div className="ulContainer">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message danger text={error} />
        ) : (
          <table className="ulTable">
            <thead>
              <tr id="ulHeader">
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Admin</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>{user.isAdmin ? <CheckIcon /> : <ClearIcon />}</td>
                  <td>
                    <Link to={`/admin/user/${user._id}/edit`}>
                      <button className="ulButton">
                        <EditIcon fontSize="small" />
                      </button>
                    </Link>{" "}
                    <button
                      className={
                        user.email === "moyisemr@gmail.com" || user._id === userInfo._id
                          ? "ulButton disabled"
                          : "ulButton"
                      }
                      onClick={() => deleteHandler(user._id)}
                      disabled={
                        user.email === "moyisemr@gmail.com" || user._id === userInfo._id
                      }
                    >
                      <DeleteIcon fontSize="small" />
                    </button>
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

export default UserListScreen;
