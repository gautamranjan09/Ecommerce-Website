import React, { useContext, useState } from 'react';
import { Button, Form, ListGroup, Modal } from 'react-bootstrap';
import CartContext from './store/CartContext';
import "./Cart.css";

const Cart = ({ show, handleClose }) => {
  const { items, totalAmount, removeItem, clearCart, updateItemQuantity } = useContext(CartContext);
  const [discountCode, setDiscountCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);

  // State to handle confirmation modal visibility
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Function to handle the Clear Cart action
  const handleClearCart = () => {
    clearCart();
    setShowConfirmModal(false); // Close confirmation modal after clearing the cart
  };

  const handleApplyDiscount = () => {
    // For simplicity, let's assume 'DISCOUNT10' is the valid code for 10% off
    if (discountCode === 'DISCOUNT10') {
      const discount = totalAmount * 0.1;
      setDiscountAmount(discount);
      setIsDiscountApplied(true);
    } else {
      alert('Invalid discount code');
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered className="cart-modal">
        <Modal.Header closeButton>
          <Modal.Title>Your Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {items.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
            <ListGroup>
              {items.map(item => (
                <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center cart-item">
                  <div className="item-info">
                    <span className="cart-item-name">{item.name}</span> - ₹{item.price}
                  </div>
                  <div className="d-flex align-items-center justify-content-between item-actions">
                    <Form.Control
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateItemQuantity(item.id, e.target.value)}
                      className="quantity-input"
                    />
                    <Button variant="danger" onClick={() => removeItem(item.id)}>
                      Remove
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>

            <Form className='discount'>
              <Form.Group controlId='discountCode'>
                <Form.Label>Discount Code</Form.Label>
                <div className='d-flex justify-content-between'>
                  <Form.Control
                  type='text'
                  value={discountCode}
                  placeholder='Enter discount code'
                  onChange={(e) => setDiscountCode(e.target.value)}
                  />
                  <Button  variant='success' onClick={handleApplyDiscount} >
                    Apply
                  </Button>
                </div>
              </Form.Group>
            </Form>
            {isDiscountApplied && (
              <p className="text-success">Discount Applied: -₹{discountAmount.toFixed(2)}</p>
            )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <div className="w-100 d-flex justify-content-between align-items-center">
            <h5>Total Amount: ₹{(totalAmount - discountAmount).toFixed(2)}</h5>
            <div  className="d-flex justify-content-between">

              <Button variant="secondary" onClick={handleClose} >Close</Button>
              <Button variant="primary" onClick={() => {
                handleClose();
                setShowConfirmModal(true);
              }}>Clear Cart</Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered className="clear-cart-modal">
        <Modal.Header closeButton>
          <Modal.Title>Clear Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to clear the cart?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowConfirmModal(false)}>Cancel</Button>
          <Button variant='danger' onClick={handleClearCart}>Yes, Clear Cart</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Cart;
