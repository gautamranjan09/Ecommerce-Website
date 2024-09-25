import "./App.css";
import { Toast } from "react-bootstrap";
import AppNavbar from "./Components/AppNavbar";
import Footer from "./Components/Footer";
import { useContext, useEffect, useState } from "react";
import Cart from "./Components/Cart";
import MyRoute from "./Routes/MyRoute";
import AuthContext from "./Components/store/auth-context";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import AuthenticationForm from "./Pages/AuthenticationForm";
import NotFound from "./Pages/NotFound";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

function App() {
  const history = useHistory();
  const location = useLocation();
  const { isLoggedIn , guestLoggedIn} = useContext(AuthContext);
  const [showCart, setShowCart] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  let mainPath= isLoggedIn? "/main/(home|store|about|contact|thank-you|payment|paymentevent)":"/main/(home|store|about|contact|thank-you)";

  useEffect(() => {
    NProgress.start();
    NProgress.done();
  }, [location.pathname]);

  const handleCartShow = () => {
    if (isLoggedIn) {
      setShowCart(true);
    } else {
      history.replace("/auth");
    }
  };
  const handleCartClose = () => setShowCart(false);

  const handleShowToast = (message) => {
    setShowToast(true);
    setToastMessage(message);
  };

  return (
    <>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/auth" />
        </Route>
        <Route path="/auth">
          <AuthenticationForm />
        </Route>
        {/* This will only render the main layout for valid "/main" paths */}
        <Route
          path="/main"
          render={({ match }) => (
            <Switch>
              {/* Main app layout */}
             {guestLoggedIn && <Route path={mainPath}>
                <AppNavbar onCartClick={handleCartShow} />
                <Cart show={showCart} handleClose={handleCartClose} />
                <MyRoute onShowToast={handleShowToast} />
                <Toast
                  onClose={() => setShowToast(false)}
                  show={showToast}
                  delay={3000}
                  autohide
                >
                  <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
                <Footer />
              </Route>}

              {/* Fallback to NotFound for invalid "/main/*" routes */}
              <Route path="/main/*">
                <NotFound />
              </Route>
            </Switch>
          )}
        />
        <Route path="*">
          {/* <NotFound /> */}
          <Redirect to="/auth"/>
        </Route>
      </Switch>
    </>
  );
}

export default App;
