// ProductCard.tsx

import React, { useEffect, useState } from "react";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import Link from "next/link";
import ProductModal from "./ProductModal"; // Import ProductModal component

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    rating: number;
    image: string;
}

const ProductCard: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        // Fetch products from your API endpoint
        fetch("http://localhost:8082/products")
            .then((response) => response.json())
            .then((data: Product[]) => setProducts(data));
    }, []);

    return (
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
            {products.map((product) => (
                <Card key={product.id} shadow="sm" >
                    <Image
                        shadow="sm"
                        radius="lg"
                        width="100%"
                        alt={product.name}
                        className="w-full object-cover h-[300px]"
                        src={product.image}
                    />
                    <CardFooter className="text-small">
                        <h2>Name:{product.name}  </h2>
                        <p>  Price: ${product.price.toFixed(2)}</p>
                        <ProductModal product={product} /> {/* Pass product details to ProductModal */}
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
};

export default ProductCard;
