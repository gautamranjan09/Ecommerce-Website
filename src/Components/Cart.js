import React, { useContext, useState } from "react";
import { Button, Form, Image, ListGroup, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom"; // Import useHistory
import CartContext from "./store/CartContext";
import "./Cart.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Cart = ({ show, handleClose }) => {
  const { items, totalAmount, removeItem, clearCart, updateItemQuantity } =
    useContext(CartContext);
  const [discountCode, setDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const history = useHistory();

  const handleClearCart = () => {
    clearCart();
    setShowConfirmModal(false);
  };

  const handleApplyDiscount = () => {
    if (discountCode === "DISCOUNT10") {
      const discount = totalAmount * 0.1;
      setDiscountAmount(discount);
      setIsDiscountApplied(true);
    } else {
      alert("Invalid discount code");
    }
  };

  const handleProceedToPayment = () => {
    handleClose(); // Close the cart modal
    history.push("/main/payment"); // Navigate to the Payment page
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered className="cart-modal">
        <Modal.Header closeButton>
          <Modal.Title>Your Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-content">
          {items.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <ListGroup className="cart-modal-body">
                {items.map((item) => (
                  <ListGroup.Item
                    key={item.id}
                    className="d-flex justify-content-between align-items-center cart-item rounded"
                  >
                    <Link
                      to={`/main/store/${item.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                      onClick={handleClose}
                    >
                      <div className="item-info d-flex align-items-center">
                        <Image
                          src={item.image[0]}
                          rounded
                          className="cart-item-image"
                        />{" "}
                        {/* Product Image */}
                        <div className="ml-3">
                          <span className="cart-item-name">{item.name}</span> -
                          ₹{item.price}
                        </div>
                      </div>
                    </Link>
                    <div className="d-flex align-items-center justify-content-between item-actions">
                      <Form.Control
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => {
                          updateItemQuantity(item.id, e.target.value);
                        }}
                        className="quantity-input"
                      />
                      <Button
                        variant="danger"
                        onClick={(e) => {
                          removeItem(item.id);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <Form className="discount">
                <Form.Group controlId="discountCode">
                  <Form.Label>Discount Code</Form.Label>
                  <div className="d-flex justify-content-between">
                    <Form.Control
                      type="text"
                      value={discountCode}
                      placeholder="Enter discount code"
                      onChange={(e) => setDiscountCode(e.target.value)}
                    />
                    <Button
                      variant="success"
                      onClick={handleApplyDiscount}
                      style={{ marginLeft: "5px" }}
                    >
                      Apply
                    </Button>
                  </div>
                </Form.Group>
              </Form>
              {isDiscountApplied && (
                <p className="text-success">
                  Discount Applied: -₹{discountAmount.toFixed(2)}
                </p>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <div className="w-100 d-flex flex-column">
            <div className="d-flex justify-content-between">
              <h5>Total Amount:</h5>
              <h5> ₹{(totalAmount - discountAmount).toFixed(2)}</h5>
            </div>
            <hr className="my-2" /> {/* Horizontal line */}
            <div className="d-flex justify-content-between">
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  handleClose();
                  setShowConfirmModal(true);
                }}
              >
                Clear Cart
              </Button>
              <Button variant="primary" onClick={handleProceedToPayment}>
                Proceed to Payment
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        centered
        className="clear-cart-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Clear Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to clear the cart?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmModal(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleClearCart}>
            Yes, Clear Cart
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Cart;
