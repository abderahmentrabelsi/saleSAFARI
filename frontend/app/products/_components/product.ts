export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    rating: number;
    image: string;
    qty: number;
    slug: string;
    brand: string;
    inWishlist: boolean;
    inCart: boolean;
}