import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/loader/Loader";
import Message from "../../../components/message/Message";
import { listProductDetails, updateProduct } from "../../../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../../../constants/productConstants";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import "./productEdit.css";

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    success: successUpdate,
    loading: loadingUpdate,
    error: errorUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setCountInStock(product.countInStock);
        setBrand(product.brand);
        setDescription(product.description);
        setCategory(product.category);
      }
    }
  }, [dispatch, product, productId, successUpdate, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    //  UPDATE PRODUCT
    dispatch(
      updateProduct({
        _id: product._id,
        name,
        price,
        image,
        countInStock,
        brand,
        description,
        category,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  return (
    <>
      <div className="peContainer">
        <Link to="/admin/productlist">
          <KeyboardReturnIcon className="icon" />
        </Link>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div className="peRow">
            <form className="form" onSubmit={submitHandler}>
              <h1 className="formTitle">Edit Product</h1>

              <div className="formGroup">
                <input
                  type="name"
                  className="formInput"
                  placeholder=" "
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label className="formLabel">Product Name</label>
              </div>

              <div className="formGroup">
                <input
                  type="number"
                  className="formInput"
                  placeholder=" "
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <label className="formLabel">Price</label>
              </div>

              <div className="formGroup">
                <input
                  type="file"
                  name="image"
                  className="uploadBox"
                  onChange={uploadFileHandler}
                />
                {uploading && <Loader />}
              </div>

              <div className="formGroup">
                <input
                  type="number"
                  className="formInput"
                  placeholder=" "
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                />
                <label className="formLabel">Count In Stock</label>
              </div>

              <div className="formGroup">
                <input
                  type="text"
                  className="formInput"
                  placeholder=" "
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
                <label className="formLabel">Brand</label>
              </div>

              <div className="formGroupDs">
                <label>Description</label>
                <textarea
                  className="textareaDs"
                  rows="4"
                  cols="37"
                  placeholder=" "
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="formGroup">
                <input
                  type="text"
                  className="formInput"
                  placeholder=" "
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
                <label className="formLabel">Category</label>
              </div>

              <input type="submit" className="formButton" value="Update" />
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductEditScreen;
