import React, { useContext } from 'react';
import { Button, Image, ListGroup } from 'react-bootstrap';
import CartContext from '../Components/store/CartContext';
import './Payment.css'; // Import the CSS file
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const CartItems = ({ onProceed }) => {
  const { items, totalAmount } = useContext(CartContext);

  return (
    <div>
      <h2>Your Cart Items:</h2>
      <ListGroup className="mb-4 cart-items-list pt-4 px-4">
        {items.length === 0 ? (
          <p>Your cart is empty. Please add items to proceed to payment.</p>
        ) : (
          items.map((item) => (
            <Link to={`/main/store/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListGroup.Item key={item.id} className="cart-item rounded">
                <div className="d-flex justify-content-between align-items-center">
                  <Image src={item.image[0]} rounded className="cart-item-image" />
                  <span>{item.name}</span>
                  <span>₹{item.price} (x{item.quantity})</span>
                </div>
              </ListGroup.Item>
            </Link>
          ))
        )}
      </ListGroup>
      {items.length > 0 && (
        <h3 className="mt-4 total-amount">Total Amount: ₹{totalAmount.toFixed(2)}</h3>
      )}
      <Button variant="secondary" className="button mt-3" onClick={() => window.history.back()}>Back to Products</Button>
      {items.length > 0 && (
        <button onClick={onProceed} className="btn btn-success mt-3">Proceed to Card Details</button>
      )}
    </div>
  );
};

export default CartItems;
