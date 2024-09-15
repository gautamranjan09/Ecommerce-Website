import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom"; // To get the product ID from the URL
import products from "../assets/DummyProducts"; // Import your product data
import { Button, Carousel, Col, Container, Row } from "react-bootstrap";
import CartContext from "../Components/store/CartContext";
import './ProductDetails.css';

const ProductDetails = ({onShowToast} ) => {
  const { productId } = useParams(); // Get the productId from the URL
  const [zoomedImage, setZoomedImage] = useState(null); // State for zoomed image
  const { addItem } = useContext(CartContext);

  // Find the product based on the productId
  const product = products.find((p) => p.id === parseInt(productId));

  const handleAddToCart = () => {
    addItem(product);
    window.history.back();
    onShowToast(`${product.name} has been added to the cart!`);
  };

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <Container className="my-5 detail">
      <Row>
        <Col md={6}>
          <Carousel>
            {product.image.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  src={image}
                  alt={product.name}
                  className="img-fluid"
                  onClick={() => setZoomedImage(image)}
                />
              </Carousel.Item>
            ))}
          </Carousel>
          {zoomedImage && (
            <div className="zoomed-image-modal" onClick={() => setZoomedImage(null)}>
              <img src={zoomedImage} alt="Zoomed" className="zoomed-image" />
            </div>
          )}
        </Col>
        <Col md={6}>
          <h2 className="product-name">{product.name}</h2>
          
          <p className="product-description">{product.description}</p>
          <h4 className="product-price">{product.priceText}</h4>
          <Button variant="primary" className="button" onClick={handleAddToCart}>Add to Cart</Button>
          <Button variant="secondary" className="button" onClick={() => window.history.back()}>Back to Products</Button>
          <div className="product-reviews mt-4">
            <h5>Customer Reviews</h5>
            {product.reviews.length > 0 ? (
              product.reviews.map((review, index) => (
                <div key={index} className="review">
                  <p className="rating">{Array(review.rating).fill('⭐⭐⭐⭐')}</p>
                  <p><strong>{review.user}</strong>: {review.comment}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet. Be the first to review!</p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
