import React, { useContext } from "react";
import { Container, Nav, Navbar, Badge } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import './AppNavbar.css'; // Import your custom CSS file
import CartContext from "./store/CartContext";

const AppNavbar = ({onCartClick}) => {
  const {items}=useContext(CartContext);

  // Calculate total quantity of items
  const totalQuantity = items.reduce((total, item) => total + (+item.quantity), 0);

  return (
    <Navbar className="py-4 " variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home" className="fw-bold">
          GR Trendz
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto d-flex justify-content-center">
            <Nav.Link className="mx-4 nav-link" href="#home">Home</Nav.Link>
            <Nav.Link className="mx-4 nav-link" href="#store">Store</Nav.Link>
            <Nav.Link className="mx-4 nav-link" href="#about">About</Nav.Link>
            <Nav.Link className="mx-4 nav-link" href="#contact">Contact Us</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link href="#cart" className="d-flex align-items-center cart"  onClick={onCartClick}>
              <FaShoppingCart size={30} />
              <Badge pill bg="danger" className="ms-2">{totalQuantity}</Badge>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
