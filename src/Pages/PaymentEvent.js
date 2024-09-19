import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./PaymentEvent.css"; // Import the CSS file
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const PaymentEvent = () => {
  const [step, setStep] = useState(1);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cardName, setCardName] = useState("");
  const [cvv, setCvv] = useState("");

  const location = useLocation();
  const { eventName, price, eventLocation, eventDate } = location.state || {
    eventName: "Unnamed Event",
    price: "N/A",
    eventLocation: "N/A",
    eventDate: "N/A",
  };
  const history = useHistory();

  const handlePayment = () => {
    if (cardNumber && expiryDate && cvv) {
      setStep(2);
    } else {
      alert("Please fill in all card details");
    }
  };

  const handleTicketConfirmation = () => {
    setStep(3);
  };

  return (
    <div className="paymentevent-page">
      {step === 1 && (
        <div className="paymentevent-form">
          <h1 className="paymentevent-heading">Payment for {eventName}</h1>
          <p className="paymentevent-text">Price: ₹{price}</p>
          <input
            type="text"
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="paymentevent-input-field"
          />
          <input
            type="text"
            placeholder="Card Name"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            className="paymentevent-input-field"
          />
          <input
            type="text"
            placeholder="Expiry Date (MM/YY)"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="paymentevent-input-field"
          />
          <input
            type="text"
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            className="paymentevent-input-field"
          />
          <button
            className="paymentevent-confirm-button"
            onClick={handlePayment}
          >
            Confirm Payment
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="paymentevent-confirmation-page">
          <h1 className="paymentevent-heading">Payment Successful!</h1>
          <p className="paymentevent-text">
            Thank you for purchasing tickets for {eventName}.
          </p>
          <button
            className="paymentevent-confirm-button"
            onClick={handleTicketConfirmation}
          >
            Go to Ticket Confirmation
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="ticket-booked-page">
          <h1 className="paymentevent-heading">
            Tickets Booked for {eventName}!
          </h1>

          <p className="paymentevent-text">
            Your booking for <strong>{eventName}</strong> has been confirmed.
          </p>

          <div className="ticket-details">
            <p>
              <strong>Date:</strong> {eventDate || "TBD"}
            </p>
            <p>
              <strong>Location:</strong> {eventLocation || "TBD"}
            </p>
            <p>
              <strong>Price:</strong> ₹{price || "N/A"}
            </p>
          </div>

          <button
            className="paymentevent-confirm-button"
            onClick={() => history.replace("/home")}
          >
            Go to Home
          </button>

          <button
            className="paymentevent-download-button"
            onClick={() => {
              alert("Ticket downloaded!");
              history.replace("/home");
            }}
          >
            Download Ticket
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentEvent;
