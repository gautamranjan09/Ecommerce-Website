import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import './ThankYou.css'; // Import the CSS file for styling

const ThankYou = () => {
  return (
    <Container fluid className="thank-you-container text-center">
      <Row className="justify-content-center my-5">
        <Col md={8}>
          <h1 className="thank-you-title">Thank You!</h1>
          <p className="thank-you-message">
            Your message has been successfully submitted. We will get back to you shortly.
          </p>
          <Link to="/main/home">
            <Button variant="primary" className="go-home-btn">Go Back to Home</Button>
          </Link>
        </Col>
      </Row>

      <Row className="my-5 text-center contact-info">
        <Col md={12}>
          <h4>Contact Information</h4>
          <p>Email: <a href="mailto:support@example.com">support@example.com</a></p>
          <p>Phone: <a href="tel:+15551234567">+1 (555) 123-4567</a></p>
          <p>Follow us on social media:</p>
          <p>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> | 
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a> | 
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default ThankYou;
