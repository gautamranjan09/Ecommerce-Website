import React, { useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import CartItems from './CartItems';
import CardDetails from './CardDetails';
import Confirmation from './Confirmation';
import OrderPlaced from './OrderPlaced';
import CartContext from '../Components/store/CartContext';
import './Payment.css';

const Payment = () => {
  const { items, totalAmount, clearCart } = useContext(CartContext);
  const [step, setStep] = useState(1);
  const [cardDetails, setCardDetails] = useState(null);

  const handleProceedToCardDetails = () => {
    setStep(2);
  };

  const handleConfirmPayment = (details) => {
    setCardDetails(details);
    setStep(3);
  };

  const handlePlaceOrder = () => {
    alert('Payment Successful! Thank you for your purchase.');
    clearCart(); // Clear cart after payment
    setStep(4);
  };

  const handleBackToCart = () => {
    setStep(1);
  };

  return (
    <Container className="payment-container rounded shadow" fluid={true}>
      <h1 className="mb-4 text-center">Payment Page</h1>
      {step === 1 && <CartItems onProceed={handleProceedToCardDetails} />}
      {step === 2 && <CardDetails onConfirm={handleConfirmPayment} onBack={handleBackToCart} />}
      {step === 3 && <Confirmation onConfirm={handlePlaceOrder} orderDetails={{ items, totalAmount }} />}
      {step === 4 && <OrderPlaced />}
      
    </Container>
  );
};

export default Payment;
