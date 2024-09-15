import React from 'react';
import { useParams } from 'react-router-dom'; // To get the product ID from the URL
import products from '../assets/DummyProducts'; // Import your product data

const ProductDetails = () => {
  const { productId } = useParams(); // Get the productId from the URL

  // Find the product based on the productId
  const product = products.find(p => p.id === parseInt(productId));

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <h4>{product.priceText}</h4>
    </div>
  );
};

export default ProductDetails;
