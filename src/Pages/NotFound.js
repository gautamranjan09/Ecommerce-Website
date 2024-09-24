import React, { useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import './NotFound.css'; // Create a separate CSS file for styling
import AuthContext from "../Components/store/auth-context";

const NotFound = () => {
  const {isLoggedIn} = useContext(AuthContext);
  return (
    <Container fluid className="not-found-container text-center align-content-center">
      <Row className="justify-content-center  my-5">
        <Col md={8}>
          <h1 className="not-found-title">404 - Page Not Found</h1>
          <p className="not-found-message">
            Oops! The page you are looking for does not exist.
          </p>

        </Col>
      </Row>
      {isLoggedIn && <Link to="/main/home">
        <Button variant="secondary" className="go-home-btn m-4">Go Back to Home</Button>
      </Link>}
      <Link to="/auth">
        <Button variant="primary" className="go-home-btn">Go Back to Authentication</Button>
      </Link>
    </Container>
  );
};

export default NotFound;
