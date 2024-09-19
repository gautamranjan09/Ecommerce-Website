import React from 'react';
import { Button, Card } from 'react-bootstrap';
import './Payment.css'; // Import the CSS file

const Confirmation = ({ onConfirm, orderDetails }) => {
  return (
    <div className="text-center mt-4">
      <h4 className="confirmation-title">Confirm Payment</h4>
      <Card className="mt-3 confirmation-card" style={{ width: '20rem', margin: 'auto' }}>
        <Card.Body>
          <Card.Title className="card-title">Order Summary</Card.Title>
          <Card.Text className="order-items">
            <strong>Items:</strong>
            <div className="items-list">
              {orderDetails.items.map(item => (
                <div key={item.id} className="item">
                  {item.name} - <span className="item-price">₹{item.price}</span> (x{item.quantity})
                </div>
              ))}
            </div>
          </Card.Text>
          <Card.Text className="total-amount">
            <strong>Total Amount:</strong> ₹{orderDetails.totalAmount.toFixed(2)}
          </Card.Text>
          <Button variant="success" className="confirm-button" onClick={onConfirm}>
            Confirm Payment
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Confirmation;
