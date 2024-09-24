import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './Payment.css'; // Import the CSS file

const CardDetails = ({ onConfirm, onBack }) => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(cardDetails);
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-4 payment-form col-sm-8 m-auto" >
      <Form.Group controlId="formCardNumber">
        <Form.Label>Card Number</Form.Label>
        <Form.Control
          type="text" // Changed to text for better handling of spaces and card formats
          name="cardNumber"
          value={cardDetails.cardNumber}
          onChange={handleChange}
          placeholder="Enter your 16-digit card number"
          pattern="\d{16}" // Regex for card number validation
          required
        />
        <Form.Text className="text-muted">Enter 16 digits without spaces.</Form.Text>
      </Form.Group>

      <Form.Group controlId="formCardHolder" className='mt-3'>
        <Form.Label>Card Holder Name</Form.Label>
        <Form.Control
          type="text"
          name="cardHolder"
          value={cardDetails.cardHolder}
          onChange={handleChange}
          placeholder="Enter the name as it appears on the card"
          required
        />
      </Form.Group>

      <div className="d-flex justify-content-between mt-3">
        <Form.Group controlId="formExpiryDate" className="me-2">
          <Form.Label>Expiry Date (MM/YY)</Form.Label>
          <Form.Control
            type="text" // Changed to text to ensure user formats correctly
            name="expiryDate"
            value={cardDetails.expiryDate}
            onChange={handleChange}
            placeholder="MM/YY"
            pattern="(0[1-9]|1[0-2])\/\d{2}" // Regex for expiry date validation
            required
          />
          <Form.Text className="text-muted">Format: MM/YY</Form.Text>
        </Form.Group>

        <Form.Group controlId="formCvv" className="ms-2">
          <Form.Label>CVV</Form.Label>
          <Form.Control
            type="text" // Changed to text for better handling of spaces
            name="cvv"
            value={cardDetails.cvv}
            onChange={handleChange}
            placeholder="3-digit CVV"
            pattern="\d{3}" // Regex for CVV validation
            required
          />
          <Form.Text className="text-muted">Last 3 digits on the back of your card.</Form.Text>
        </Form.Group>
      </div>

      <div className="mt-4 mx-md-4 d-flex justify-content-between">
        <Button variant="secondary" onClick={onBack}>Back to Cart</Button>
        <Button variant="success" type="submit" className="ms-2">Confirm Payment</Button>
      </div>
    </Form>
  );
};

export default CardDetails;
