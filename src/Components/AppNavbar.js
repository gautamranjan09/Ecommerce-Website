import React, { useContext } from "react";
import { Container, Nav, Navbar, Badge, Button } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import './AppNavbar.css'; // Import your custom CSS file
import CartContext from "./store/CartContext";
import { NavLink, Link } from "react-router-dom/cjs/react-router-dom.min";

const AppNavbar = ({ onCartClick, isLoggedIn, onLogout, username }) => {
  const { items } = useContext(CartContext);

  // Calculate total quantity of items
  const totalQuantity = items.reduce((total, item) => total + (+item.quantity), 0);

  return (
    <Navbar className="py-4" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/home" className="fw-bold">
          GR Trendz
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto d-flex justify-content-center">
            <Nav.Link as={NavLink} className="mx-4 nav-link" to="/home" activeStyle={{ textDecoration: 'underline', color: '#ffb300' }}>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} className="mx-4 nav-link" to="/store" activeStyle={{ textDecoration: 'underline', color: '#ffb300' }}>
              Store
            </Nav.Link>
            <Nav.Link as={NavLink} className="mx-4 nav-link" to="/about" activeStyle={{ textDecoration: 'underline', color: '#ffb300' }}>
              About
            </Nav.Link>
            <Nav.Link as={NavLink} className="mx-4 nav-link" to="/contact" activeStyle={{ textDecoration: 'underline', color: '#ffb300' }}>
              Contact Us
            </Nav.Link>
            {isLoggedIn && (
              <Nav.Link as={NavLink} className="mx-4 nav-link" to="/profile" activeStyle={{ textDecoration: 'underline', color: '#ffb300' }}>
                Profile
              </Nav.Link>
            )}
          </Nav>
          <Nav className="ms-auto align-items-center">
            {isLoggedIn && (
              <Navbar.Text className="welcome-message mx-3">
                Welcome, {username}
              </Navbar.Text>
            )}
            <Nav.Link href="#cart" className="d-flex align-items-center cart" onClick={onCartClick}>
              <FaShoppingCart size={30} />
              <Badge pill bg="danger" className="ms-2">{totalQuantity}</Badge>
            </Nav.Link>
            {isLoggedIn ? (
              <Button variant="outline-light" className="mx-3" onClick={onLogout}>
                Logout
              </Button>
            ) : (
              <Button variant="outline-light" className="mx-3" as={Link} to="/login">
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
