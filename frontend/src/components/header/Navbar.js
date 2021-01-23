import React, { useEffect, useRef, useState } from "react";
import { Link, Route } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { BsCardHeading } from "react-icons/bs";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import SearchBox from "../searchBox/SearchBox";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import GroupIcon from "@material-ui/icons/Group";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import NoteIcon from "@material-ui/icons/Note";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const Navbar = ({ toggle }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const ref = useRef();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      document.body.addEventListener("click", (event) => {
        if (ref.current.contains(event.target)) {
          return;
        }
        setOpen(false);
      });
    }
  }, [userInfo]);

  const logoutHandler = () => {
    dispatch(logout());
  };

  const menuToggleHandler = () => {
    setOpen(!open);
  };

  return (
    <>
      <nav className="nav">
        <div className="navContainer">
          <Link className="navLogo" to="/">
            Sneakers
          </Link>
          <div className="mobileIcon" onClick={toggle}>
            <FaBars />
          </div>
          <Route render={({ history }) => <SearchBox history={history} />} />
          <ul className="navMenu">
            <li className="navItem">
              <Link className="navLink" to="/about">
                <BsCardHeading style={{ marginRight: "5px" }} />
                About
              </Link>
            </li>
            <li className="navItem">
              <Link className="navLink" to="/cart">
                <FiShoppingBag style={{ marginRight: "5px" }} /> Cart
              </Link>
            </li>
            <li>
              {userInfo ? (
                <>
                  <div ref={ref} className="action">
                    <div
                      onClick={menuToggleHandler}
                      className={userInfo.isAdmin ? "profile admin" : "profile"}
                    >
                      {userInfo.isAdmin ? "Admin" : userInfo.name}
                    </div>
                    <div className={open ? "menu active" : "menu"}>
                      <ul onClick={menuToggleHandler}>
                        {userInfo && userInfo.isAdmin && (
                          <>
                            <li>
                              <Link className="navLink" to="/admin/userlist">
                                <GroupIcon className="icon" /> Users
                              </Link>
                            </li>
                            <li>
                              <Link className="navLink" to="/admin/orderlist">
                                <NoteIcon className="icon" />
                                Orders
                              </Link>
                            </li>
                            <li>
                              <Link className="navLink" to="/admin/productlist">
                                <ShoppingBasketIcon className="icon" />
                                Products
                              </Link>
                            </li>
                          </>
                        )}
                        <li>
                          <Link className="navLink" to="/profile">
                            <AccountCircleIcon className="icon" />
                            Profile
                          </Link>
                        </li>
                        <li>
                          <div className="navLink" onClick={logoutHandler}>
                            <ExitToAppIcon className="icon" />
                            Logout
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </>
              ) : (
                <Link className="navBtnLink" to="/login">
                  Sign In
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
