import React from "react";
import { Button, Container } from "react-bootstrap";
import "./Payment.css"; // Import the CSS file
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const OrderPlaced = () => {
  const orderId = Math.floor(Math.random() * 1000000); // Example order ID
  const estimatedDelivery = new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000
  ).toLocaleDateString(); // Delivery in 7 days
  const history = useHistory();

  return (
    <Container
      className="my-4 text-center order-placed"
      style={{ minHeight: "400px" }}
    >
      <h2>Order Placed Successfully!</h2>
      <p>Thank you for your purchase.</p>
      <p>
        Your order ID is: <strong>{orderId}</strong>
      </p>
      <p>
        Estimated Delivery Date: <strong>{estimatedDelivery}</strong>
      </p>
      <p>We appreciate your business and hope to see you again soon!</p>
      <Button
        variant="success"
        className="confirm-button"
        onClick={() => history.replace("/home")}
      >
        Go to Home
      </Button>
    </Container>
  );
};

export default OrderPlaced;
