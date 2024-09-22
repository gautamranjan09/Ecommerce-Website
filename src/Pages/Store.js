import React, { useContext, useState } from "react";
import { Container, Row, Col, Card, Button, Dropdown } from "react-bootstrap";
import "./Store.css"; // Custom CSS for additional styling
import CartContext from "../Components/store/CartContext";
import products from "../assets/DummyProducts";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AuthContext from "../Components/store/auth-context";

const Store = ({ onShowToast }) => {
    const { addItem } = useContext(CartContext);
    const [sortOption, setSortOption] = useState("default"); // Default sort option
    const {isLoggedIn}= useContext(AuthContext);
    const history = useHistory();

    // Function to handle sorting of products
    const sortedProducts = () => {
        return [...products].sort((a, b) => {
            switch (sortOption) {
                case "name":
                    return a.name.localeCompare(b.name); // Sort by name
                case "priceLowToHigh":
                    return a.price - b.price; // Sort by price: low to high
                case "priceHighToLow":
                    return b.price - a.price; // Sort by price: high to low
                default:
                    return 0; // Default order (no sorting)
            }
        });
    };

    const addToCartHandler = (product, event) => {
        event.preventDefault();
        if(isLoggedIn){
            addItem(product);
            onShowToast(`${product.name} has been added to the cart!`);
        }
        else{
            history.replace("/");
        }
    };

    return (
        <Container className="pb-5"  style={{backgroundColor:"#f9f9f9"}} fluid>
            <h2 className="text-center mb-4 pt-5">Our Store</h2>
            <div className="mb-4 text-center">
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Sort By: {sortOption === "default" ? "Default Order" : sortOption === "name" ? "Name" : sortOption === "priceLowToHigh" ? "Price: Low to High" : "Price: High to Low"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setSortOption("default")}>Default Order</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={() => setSortOption("priceLowToHigh")}>Price: Low to High</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSortOption("priceHighToLow")}>Price: High to Low</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={() => setSortOption("name")}>Name</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <Row className="mx-5">
                {sortedProducts().map((product) => (
                    <Col key={product.id} sm={12} md={6} lg={4} className="mb-4">
                        <Link to={`/main/store/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Card className="h-100">
                                <Card.Img variant="top" src={product.image[0]} />
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>{product.description}</Card.Text>
                                    <h5>{product.priceText}</h5>
                                    <Button variant="primary" onClick={(event) => addToCartHandler(product, event)}>Add to Cart</Button>
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
