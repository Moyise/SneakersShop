import React, { useEffect, useRef, useState } from "react";
import { Link, Route } from "react-router-dom";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import SearchBox from "../searchBox/SearchBox";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
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
      <div className="navContainer">
        <nav>
          <label>
            <Link className="logo" to="/">
              Sneakers
            </Link>
          </label>
          <ul className={show ? "show" : ""} onClick={() => setShow(!show)}>
            <li>
              <Route render={({ history }) => <SearchBox history={history} />} />
            </li>
            <li>
              <Link className="aLink" to="/about">
                <i className="fas fa-address-card"></i> About
              </Link>
            </li>
            <li>
              <Link className="aLink" to="/cart">
                <i className="fas fa-shopping-cart"></i> Cart
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
                              <Link className="aLink" to="/admin/userlist">
                                <i className="fas fa-users"></i> Users
                              </Link>
                            </li>
                            <li>
                              <Link className="aLink" to="/admin/orderlist">
                                <i className="fas fa-sticky-note"></i> Orders
                              </Link>
                            </li>
                            <li>
                              <Link className="aLink" to="/admin/productlist">
                                <i className="fas fa-shopping-basket"></i> Products
                              </Link>
                            </li>
                          </>
                        )}
                        <li>
                          <Link className="aLink" to="/profile">
                            <i className="fas fa-user-circle"></i> Profile
                          </Link>
                        </li>
                        <li>
                          <div className="aLink" onClick={logoutHandler}>
                            <i className="fas fa-sign-out-alt"></i> Logout
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </>
              ) : (
                <Link className="aLinkBtn" to="/login">
                  Sign In
                </Link>
              )}
            </li>
          </ul>
          <label id="icon" onClick={() => setShow(!show)}>
            <i className={show ? "fas fa-times" : "fas fa-bars"}></i>
          </label>
        </nav>
      </div>
    </>
  );
};

export default Navbar;

// };
