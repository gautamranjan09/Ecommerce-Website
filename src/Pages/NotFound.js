import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import './NotFound.css'; // Create a separate CSS file for styling

const NotFound = () => {
  return (
    <Container fluid className="not-found-container text-center">
      <Row className="justify-content-center my-5">
        <Col md={8}>
          <h1 className="not-found-title">404 - Page Not Found</h1>
          <p className="not-found-message">
            Oops! The page you are looking for does not exist.
          </p>
          <Link to="/home">
            <Button variant="primary" className="go-home-btn">Go Back to Home</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
