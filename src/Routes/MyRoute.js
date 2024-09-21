import React, { useContext } from "react";
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
import PaymentEvent from "../Pages/PaymentEvent";
import AuthenticationForm from "../Pages/AuthenticationForm";
import AuthContext from "../Components/store/auth-context";

const MyRoute = (props) => {
  const {isLoggedIn}= useContext(AuthContext);
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/Auth" />
        </Route>
        <Route path="/Auth">
          <AuthenticationForm/>
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
        {isLoggedIn && <Route path="/payment">
          <Payment/>
        </Route>}
       {isLoggedIn && <Route path="/paymentevent">
          <PaymentEvent/>
        </Route>}
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </>
  );
};

export default MyRoute;
