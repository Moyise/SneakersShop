import React from "react";
import { Link, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import { FaTimes } from "react-icons/fa";
import "./header.css";
import SidebarSearchBox from "../searchBox/SidebarSearchBox";

const Sidebar = ({ open, toggle }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <aside className={open ? "sidebarContainerOpen" : "sidebarContainer"}>
      <div className="sidebarIcon" onClick={toggle}>
        <FaTimes />
      </div>
      <div className="sidebarWrapper">
        <div className="sidebarMenu" onClick={toggle}>
          <Link
            className={
              userInfo && userInfo.isAdmin ? "sidebarLink top admin" : "sidebarLink top"
            }
            to="/"
          >
            Welcome {userInfo && userInfo.isAdmin ? "Admin" : userInfo && userInfo.name}
          </Link>
          <Link className="sidebarLink" to="/about">
            About
          </Link>
          <Link className="sidebarLink" to="/cart">
            Cart
          </Link>

          {userInfo && (
            <>
              <Link className="sidebarLink" to="/profile">
                Profile
              </Link>
            </>
          )}
          {userInfo && userInfo.isAdmin && (
            <>
              <Link className="sidebarLink" to="/admin/userlist">
                Users
              </Link>
              <Link className="sidebarLink" to="/admin/orderlist">
                Orders
              </Link>
              <Link className="sidebarLink" to="/admin/productlist">
                Products
              </Link>
            </>
          )}
        </div>
        <Route render={({ history }) => <SidebarSearchBox history={history} />} />

        <div className="sidebarBtnWrapper" onClick={toggle}>
          {userInfo ? (
            <div className="sidebarBtnLink" onClick={logoutHandler}>
              Logout
            </div>
          ) : (
            <Link className="sidebarBtnLink" to="/login">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
