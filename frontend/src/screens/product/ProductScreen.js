import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails, createProductReview } from "../../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../../constants/productConstants";
import Rating from "../../components/Rating";
import Message from "../../components/message/Message";
import Loader from "../../components/loader/Loader";
import { Link } from "react-router-dom";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import "./productScreen.css";
import Meta from "../../components/Meta";

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { product, error, loading } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      alert("Review Submitted");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successProductReview]);

  const addToCartHandler = () => {
    history.push("/cart/" + match.params.id + "/?qty=" + qty);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(match.params.id, { rating, comment }));
  };

  return (
    <>
      <Meta title={product.name} />
      <div className="pContainer">
        <Link to="/">
          <KeyboardReturnIcon className="icon" />
        </Link>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message danger text={error} />
        ) : (
          <>
            <div className="pWrapper">
              <div className="imageWrap">
                <img className="img" src={product.image} alt={product.name} />
              </div>
              <div className="listGroup">
                <div className="listItem">
                  <h2 className="name">{product.name}</h2>
                </div>
                <hr />
                <div className="listItem">
                  <Rating value={product.rating} />
                  <div>{product.numReviews} reviews</div>
                </div>
                <hr />
                <div className="listItem">
                  <div>{product.description}</div>
                </div>
              </div>
              <div className="tableGroup">
                <div className="cartItem">
                  <h3>Price :</h3>
                  <h3 className="price">${product.price}</h3>
                </div>
                <hr />
                <div className="cartItem">
                  <h3>Status :</h3>
                  <h3 className="status">
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </h3>
                </div>
                <hr />
                {product.countInStock > 0 && (
                  <>
                    <div className="cartItem">
                      <h3>Quantity :</h3>
                      <h3 className="selection">
                        <select
                          className="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option className="option" key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </h3>
                    </div>
                    <hr />
                  </>
                )}
                <div className="cartItem">
                  <button
                    className={product.countInStock === 0 ? "button inactive" : "button"}
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
            <div className="pReviews">
              <div>
                <h2>Reviews</h2>
                {product.reviews.length === 0 && <Message text="No Reviews" />}
              </div>
              <div>
                {product.reviews.map((review) => (
                  <div key={review._id} className="addedReview">
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </div>
                ))}
                <div className="addReview">
                  <h3>Write a Customer Review</h3>
                  {errorProductReview && <Message danger text={errorProductReview} />}
                  {userInfo ? (
                    <form className="form2" onSubmit={submitHandler}>
                      <div className="formGroupRating">
                        <label className="label">Rating</label>

                        <select
                          className="select"
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option className="option" value="">
                            Select...
                          </option>
                          <option className="option" value="1">
                            1 - Poor
                          </option>
                          <option className="option" value="2">
                            2 - Fair
                          </option>
                          <option className="option" value="3">
                            3 - Good
                          </option>
                          <option className="option" value="4">
                            4 - Very Goog
                          </option>
                          <option className="option" value="5">
                            5 - Excellent
                          </option>
                        </select>
                      </div>
                      <div className="formGroupComment">
                        <label className="label">Comment</label>
                        <textarea
                          className="textarea"
                          rows={6}
                          cols={40}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </div>
                      <input className="input" type="submit" value="Submit" />
                    </form>
                  ) : (
                    <Message text="Please Sign In to write a review" />
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductScreen;
