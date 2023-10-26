'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Product {
  id: number; // Include a unique ID for each product
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
}

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState<Product | null>(null); // Define the type for product

  useEffect(() => {
    if (id) {
      // Fetch the product details based on the ID
      fetch(`http://localhost:8082/products/${id}`)
        .then((response) => response.json())
        .then((data: Product) => setProduct(data)); // Type assertion here
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Product Details</h1>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price.toFixed(2)}</p>
      <p>Rating: {product.rating}</p>
      {/* Add more product details as needed */}
    </div>
  );
};

export default ProductDetail;
