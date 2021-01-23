import React from "react";
import Rating from "../Rating";
import { Link } from "react-router-dom";
import "./product.css";

const Product = ({ product }) => {
  return (
    <div className="cardContent">
      <h2 className="homeProductPrice">${product.price}</h2>
      <Link to={`/product/${product._id}`} className="cardLink">
        <img src={product.image} alt={product.name} className="cardImage" />
      </Link>
      <Rating value={product.rating} />
      <Link to={`/product/${product._id}`} className="cardLink">
        <h3 className="homeProductTitle">{product.name}</h3>
      </Link>
    </div>
  );
};

export default Product;
