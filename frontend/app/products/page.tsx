'use client';
import ProductCard from "./_components/ProductCard";
import { useSession } from 'next-auth/react';

const ProductsPage: React.FC = () => {
    const { data: session } = useSession();

    return (
        <div>
            <h1>Products</h1>
            {session ? (
                <ProductCard />
            ) : (
                <h1>Unauthenticated. Please log in to view products.</h1>
            )}
        </div>
    );
};

export default ProductsPage;
