import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/loader/Loader";
import Message from "../../../components/message/Message";
import {
  createProduct,
  deleteProduct,
  listProducts,
} from "../../../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../../../constants/productConstants";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import "./productList.css";

const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    success: successDelete,
    loading: loadingDelete,
    error: errorDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    product: createdProduct,
    success: successCreate,
    error: errorCreate,
  } = productCreate;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts("", pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      //    DELETE PRODUCTS
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    //    CREATE PRODUCT
    dispatch(createProduct());
  };

  return (
    <>
      <div className="plContainer">
        <div className="plRow">
          <div>
            <h1>Products</h1>
          </div>
          <div>
            <button className="prCreate" onClick={createProductHandler}>
              Create Product
            </button>
          </div>
        </div>
        {loadingDelete && <Loader />}
        {errorDelete && <Message danger text={errorDelete} />}
        {loadingCreate && <Loader />}
        {errorCreate && <Message danger text={errorCreate} />}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message danger text={error} />
        ) : (
          <>
            <table className="plTable">
              <thead>
                <tr id="plHeader">
                  <th>ID</th>
                  <th>Name</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <Link to={`/admin/product/${product._id}/edit`}>
                        <button className="plButton">
                          <EditIcon fontSize="small" />
                        </button>
                      </Link>{" "}
                      <button
                        className="plButton"
                        onClick={() => deleteHandler(product._id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
};

export default ProductListScreen;
