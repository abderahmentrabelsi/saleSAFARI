import React, { useEffect, useState } from "react";
import { Card, CardFooter, Image } from "@nextui-org/react";

interface Product {
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
            {products.map((product, index) => (
                <Card
                    key={index}
                    shadow="sm"
                    isPressable
                    onPress={() => console.log("item pressed")}
                >
                    <Image
                        shadow="sm"
                        radius="lg"
                        width="100%" // Set the image width to 100% to match the card width
                        alt={product.name}
                        className="w-full object-cover h-[140px]"
                        src={product.image}
                    />
                    <CardFooter className="text-small justify-between">
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>Price: ${product.price.toFixed(2)}</p>
                        <p>Rating: {product.rating}</p>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
};

export default ProductCard;
