import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import AboutScreen from "./screens/about/AboutScreen";
import OrderListScreen from "./screens/admin/orderList/OrderListScreen";
import ProductEditScreen from "./screens/admin/productEdit/ProductEditScreen";
import ProductListScreen from "./screens/admin/productList/ProductListScreen";
import UserEditScreen from "./screens/admin/userEdit/UserEditScreen";
import UserListScreen from "./screens/admin/userList/UserListScreen";
import CartScreen from "./screens/cart/CartScreen";
import HomeScreen from "./screens/home/HomeScreen";
import LoginScreen from "./screens/login/LoginScreen";
import OrderScreen from "./screens/order/OrderScreen";
import PaymentScreen from "./screens/payment/PaymentScreen";
import PlaceOrderScreen from "./screens/placeOrder/PlaceOrderScreen";
import ProductScreen from "./screens/product/ProductScreen";
import ProfileScreen from "./screens/profile/ProfileScreen";
import RegisterScreen from "./screens/register/RegisterScreen";
import ShippingScreen from "./screens/shipping/ShippingScreen";

function App() {
  return (
    <>
      <Router>
        <section className="container">
          <Header />
          <Switch>
            <Route path="/order/:id" exact component={OrderScreen} />
            <Route path="/placeorder" exact component={PlaceOrderScreen} />
            <Route path="/payment" exact component={PaymentScreen} />
            <Route path="/shipping" exact component={ShippingScreen} />
            <Route path="/profile" exact component={ProfileScreen} />
            <Route path="/register" exact component={RegisterScreen} />
            <Route path="/login" exact component={LoginScreen} />
            <Route path="/cart/:id?" exact component={CartScreen} />
            <Route path="/about" exact component={AboutScreen} />
            <Route path="/product/:id" exact component={ProductScreen} />
            <Route path="/admin/user/:id/edit" exact component={UserEditScreen} />
            <Route path="/admin/userlist" exact component={UserListScreen} />
            <Route path="/admin/product/:id/edit" exact component={ProductEditScreen} />
            <Route path="/admin/productlist" exact component={ProductListScreen} />
            <Route path="/admin/orderlist" exact component={OrderListScreen} />
            <Route path="/search/:keyword" exact component={HomeScreen} />
            <Route path="/" exact component={HomeScreen} />
          </Switch>
          <Footer />
        </section>
      </Router>
    </>
  );
}

export default App;
