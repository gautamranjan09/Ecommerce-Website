import "./App.css";
import { Container, Navbar, Nav, NavDropdown, Button, Toast } from "react-bootstrap";
import AppNavbar from "./Components/AppNavbar";
import Footer from "./Components/Footer";
import { useState } from "react";
import Cart from "./Components/Cart";
import MyRoute from "./Routes/MyRoute";

function App() {
  const  [showCart, setShowCart] = useState(false);
  const [showToast,  setShowToast] = useState(false);
  const [toastMessage,   setToastMessage] = useState("");

  const  handleCartShow = () => setShowCart(true);
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
