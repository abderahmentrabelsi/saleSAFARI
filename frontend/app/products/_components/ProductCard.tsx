import React, { useEffect, useState } from 'react';
import { Card, CardFooter, Image, Button } from '@nextui-org/react';
import { Product } from './product'; // Import the Product type
import CreateProductModal from './CreateProductModal';
import ProductModal from '@/app/products/_components/ProductModal'; // Import the CreateProductModal component
import AddToCartButton from '@/components/cart/addToCart';

const ProductCard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showProductForm, setShowProductForm] = useState(false);

  useEffect(() => {
    // Fetch products from your API endpoint
    fetch('http://ms-market:8082/products')
      .then((response) => response.json())
      .then((data: Product[]) => setProducts(data));
  }, []);

  const handleAddProductClick = () => {
    setShowProductForm(true);
  };

  const handleProductCreate = (newProduct: Product) => {
    // Send a POST request to add the new product to your API
    fetch('http://ms-market:8082/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProduct)
    })
      .then((response) => response.json())
      .then((createdProduct) => {
        // Add the newly created product to the state
        setProducts([...products, createdProduct]);
      })
      .catch((error) => {
        console.error('Error adding product:', error);
      });
  };

  return (
    <div>
      <div className="text-right mb-4">
        <Button color="primary" onClick={handleAddProductClick}>
          Add Product
        </Button>
      </div>
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
        {products.map((product) => (
          <Card key={product.id} shadow="sm">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={product.name}
              className="w-full object-cover h-[300px]"
              src={product.image}
            />
            <CardFooter className="text-small">
              <h2>Name: {product.name}</h2>
              <p>Price: ${product.price.toFixed(2)}</p>
              <AddToCartButton product={product} />
            </CardFooter>
            <ProductModal product={product} />
          </Card>
        ))}
      </div>

      <CreateProductModal
        isOpen={showProductForm}
        onClose={() => setShowProductForm(false)}
        onProductCreate={handleProductCreate}
      />
    </div>
  );
};

export default ProductCard;
