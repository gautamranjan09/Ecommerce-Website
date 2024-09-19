import React from "react";
import Store from "../Pages/Store";
import {
  Redirect,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import ProductDetails from "../Pages/ProductDetails";
import NotFound from "../Pages/NotFound";
import ThankYou from "../Pages/ThankYou";
import Payment from "../Pages/Payment";

const MyRoute = (props) => {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/store" exact>
          <Store onShowToast={props.onShowToast} />
        </Route>
        <Route path="/store/:productId">
          <ProductDetails onShowToast={props.onShowToast} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/thank-you">
          <ThankYou />
        </Route>
        <Route path="/payment">
          <Payment/>
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </>
  );
};

export default MyRoute;
