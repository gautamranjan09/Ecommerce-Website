import "./App.css";
import { Container, Navbar, Nav, NavDropdown, Button, Toast } from "react-bootstrap";
import AppNavbar from "./Components/AppNavbar";
import Footer from "./Components/Footer";
import Store from "./Components/Store";
import { useState } from "react";
import Cart from "./Components/Cart";

function App() {
  const  [showCart, setShowCart] = useState(false);
  const [showToast,  setShowToast] = useState(false);
  const [toastMessage,   setToastMessage] = useState("");

  const  handleShow = () => setShowCart(true);
  const  handleClose = () => setShowCart(false);

  const handleShowToast = (message)=>{
    setShowToast(true);
    setToastMessage(message);
    
  }

  return (
    <>
      <AppNavbar onCartClick={handleShow} />
      <Cart show={showCart} handleClose={handleClose} />
      <Store onShowToast={handleShowToast}/>
      
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      
      <Footer />
    </>
  );
}

export default App;
