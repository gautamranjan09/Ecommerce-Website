import "./App.css";
import { Toast } from "react-bootstrap";
import AppNavbar from "./Components/AppNavbar";
import Footer from "./Components/Footer";
import { useContext, useState } from "react";
import Cart from "./Components/Cart";
import MyRoute from "./Routes/MyRoute";
import AuthContext from "./Components/store/auth-context";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  
  const history = useHistory();
  const {isLoggedIn}=useContext(AuthContext);
  const  [showCart, setShowCart] = useState(false);
  const [showToast,  setShowToast] = useState(false);
  const [toastMessage,   setToastMessage] = useState("");

  const  handleCartShow = () => {
    if(isLoggedIn){
      setShowCart(true);
    }
    else{
      history.replace("/auth");
    }
  };
  const  handleCartClose = () => setShowCart(false);

  const handleShowToast = (message)=>{
    setShowToast(true);
    setToastMessage(message);
  }

  return (
    <>
      <AppNavbar onCartClick={handleCartShow} />
      <Cart show={showCart} handleClose={handleCartClose} />
      <MyRoute onShowToast={handleShowToast}/>
      
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      
      <Footer />
    </>
  );
}

export default App;
