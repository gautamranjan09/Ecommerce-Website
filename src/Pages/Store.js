import React, { useContext } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./Store.css"; // Custom CSS for additional styling
import CartContext from "../Components/store/CartContext";
import products from "../assets/DummyProducts";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

  

const Store = ({onShowToast}) => {
    const { addItem }=useContext(CartContext);
    
    const addToCartHandler = (product,event)=>{
      event.preventDefault();
        addItem(product);
        onShowToast(`${product.name} has been added to the cart!`)
    }
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Our Store</h2>
      <Row>
        {products.map((product) => (
          <Col key={product.id} sm={12} md={6} lg={4} className="mb-4">
            <Link to={`/store/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Card className="h-100">
                <Card.Img variant="top" src={product.image} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <h5>{product.priceText}</h5>
                  <Button variant="primary" onClick={(event) => addToCartHandler(product,event)}>Add to Cart</Button>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Store;
