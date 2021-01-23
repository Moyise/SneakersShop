import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../actions/cartActions";
import Message from "../../components/message/Message";
import DeleteIcon from "@material-ui/icons/Delete";
import "./cart.css";

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <div className="csContainer">
      <h1 className="csTitle">Shopping Cart</h1>
      <div className="csRow">
        <div className="csCol">
          {cartItems.length === 0 ? (
            <>
              <Message text="Your cart is empty " />
              <Link className="csLink" to="/">
                Go Back
              </Link>
            </>
          ) : (
            <div className="csListGroup">
              {cartItems.map((item) => (
                <div className="csItem" key={item.product}>
                  <div className="csRow">
                    <div className="csCol">
                      <img src={item.image} alt={item.name} className="csImg" />
                    </div>
                    <div className="csCol">
                      <Link className="csLink" to={"/product/" + item.product}>
                        <p>{item.name}</p>
                      </Link>
                    </div>
                    <div className="csCol">${item.price}</div>
                    <div className="csCol">
                      <select
                        className="csSelect"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(addToCart(item.product, Number(e.target.value)))
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option className="csOption" key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="csCol">
                      <button
                        className="csButton"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {cartItems.length !== 0 && (
          <div className="csCol">
            <div className="csTable">
              <div className="csListGroup">
                <div className="csItem">
                  <h3>
                    Subtotal: ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                  </h3>
                  <h3>
                    $
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </h3>
                </div>
                <div className="csItem">
                  <button
                    className="csCheckoutButton"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartScreen;
