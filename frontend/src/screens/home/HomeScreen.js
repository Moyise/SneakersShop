import React, { useEffect } from "react";
import Product from "../../components/product/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";
import Loader from "../../components/loader/Loader";
import Message from "../../components/message/Message";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import "./home.css";
import Meta from "../../components/Meta";
import { Link } from "react-router-dom";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);

  const { products, error, loading } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      <Meta
        title="Welcome to Sneakers"
        description="We sell the best Sneakers"
        keywords="Fashion, buy shoes, cheap shoes"
      />
      <div className="homeContainer">
        {keyword && (
          <Link to="/">
            <KeyboardReturnIcon className="icon" />
          </Link>
        )}
        <h1 className="homeTitle">Latest Products</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message danger={error} text={error} />
        ) : (
          <div className="cardContainer">
            {products.map((product) => (
              <div key={product.name} className="homeCard">
                <Product product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default HomeScreen;
