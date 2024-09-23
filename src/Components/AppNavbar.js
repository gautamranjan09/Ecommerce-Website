import React, { useContext } from "react";
import { Container, Nav, Navbar, Badge, Button } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import './AppNavbar.css'; // Import your custom CSS file
import CartContext from "./store/CartContext";
import { NavLink, Link } from "react-router-dom/cjs/react-router-dom.min";
import AuthContext from "./store/auth-context";

const AppNavbar = ({ onCartClick}) => {
  const { items } = useContext(CartContext);
  const {isLoggedIn, logout, username}= useContext(AuthContext);

  // Calculate total quantity of items
  const totalQuantity = items.reduce((total, item) => total + (+item.quantity), 0);

  return (
    <Navbar className="py-4" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/main/home" className="fw-bold">
          GR Trendz
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex justify-content-center">
            <Nav.Link as={NavLink} className="mx-4 nav-link" to="/main/home" activeStyle={{ textDecoration: 'underline', color: '#ffb300' }}>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} className="mx-4 nav-link" to="/main/store" activeStyle={{ textDecoration: 'underline', color: '#ffb300' }}>
              Store
            </Nav.Link>
            <Nav.Link as={NavLink} className="mx-4 nav-link" to="/main/about" activeStyle={{ textDecoration: 'underline', color: '#ffb300' }}>
              About
            </Nav.Link>
            <Nav.Link as={NavLink} className="mx-4 nav-link" to="/main/contact" activeStyle={{ textDecoration: 'underline', color: '#ffb300' }}>
              Contact Us
            </Nav.Link>
            {isLoggedIn && (
              <Nav.Link as={NavLink} className="mx-4 nav-link" to="/main/profile" activeStyle={{ textDecoration: 'underline', color: '#ffb300' }}>
                Profile
              </Nav.Link>
            )}
          </Nav>
          <Nav className="ms-auto d-flex align-items-center ps-4">
            {isLoggedIn && (
              <Navbar.Text className="welcome-message me-0">
                Welcome, {username}
              </Navbar.Text>
            )}
            <Nav.Link  className="cart-icon" onClick={onCartClick}>
              <FaShoppingCart size={30} />
              <Badge pill bg="danger" className="ms-2">{totalQuantity}</Badge>
            </Nav.Link>
            {isLoggedIn ? (
              <Button variant="outline-light" className="me-0 mt-1" onClick={logout}>
                Logout
              </Button>
            ) : (
              <Button variant="outline-light" className="me-0 mt-1" as={Link} to="/auth">
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
