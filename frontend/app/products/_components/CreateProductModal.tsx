import React, { useState } from 'react';
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Input,
    Textarea,
} from '@nextui-org/react';
import { Product } from './product'; // Import the Product type

export interface CreateProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onProductCreate: (product: Product) => void;
}

const CreateProductModal: React.FC<CreateProductModalProps> = ({
                                                                   isOpen,
                                                                   onClose,
                                                                   onProductCreate,
                                                               }: CreateProductModalProps) => {
    const [productData, setProductData] = useState<Product>({
        id: 0,
        name: '',
        description: '',
        price: 0,
        rating: 0,
        image: '',
        qty: 0,
        slug: '',
        brand: '',
        inWishlist: false,
        inCart: false,
    });

    function handleCreateProduct() {
        // Validate input fields here (if needed)

        // Create a new product
        const newProduct: Product = {
            // Generate a unique ID (replace with actual ID)
            ...productData,
        };

        // Call the callback to create the product
        onProductCreate(newProduct);
        onClose();
    }

    // @ts-ignore
    return (
        <Modal size="lg" isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Create Product</ModalHeader>
                <ModalBody>
                    <Input
                        isRequired
                        label="Name"
                        placeholder="Product Name"
                        value={productData.name}
                        onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                    />
                    <Textarea
                        minRows={5}
                        label="Description"
                        placeholder="Product Description"
                        value={productData.description}
                        onValueChange={(value) => setProductData({ ...productData, description: value })}
                    />
                    <Input
                        isRequired
                        label="Price"
                        type="number"
                        value={productData.price.toString()} // Convert to string
                        onChange={(e) => setProductData({ ...productData, price: parseFloat(e.target.value) })}
                    />

                    <Input
                        isRequired
                        label="Rating"
                        type="number"
                        value={productData.rating.toString()} // Convert to string
                        onChange={(e) => setProductData({ ...productData, rating: parseFloat(e.target.value) })}
                    />
                    <Input
                        isRequired
                        label="Image URL"
                        placeholder="Product Image URL"
                        value={productData.image}
                        onChange={(e) => setProductData({ ...productData, image: e.target.value })}
                    />
                    <Input
                        isRequired
                        label="Quantity"
                        type="number"
                        value={productData.qty.toString()} // Convert to string
                        onChange={(e) => setProductData({ ...productData, qty: parseInt(e.target.value) })}
                    />
                    <Input
                        isRequired
                        label="Slug"
                        placeholder="Product Slug"
                        value={productData.slug}
                        onChange={(e) => setProductData({ ...productData, slug: e.target.value })}
                    />
                    <Input
                        isRequired
                        label="Brand"
                        placeholder="Product Brand"
                        value={productData.brand}
                        onChange={(e) => setProductData({ ...productData, brand: e.target.value })}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" variant="light" onPress={onClose}>
                        Close
                    </Button>
                    <Button color="primary" onPress={handleCreateProduct}>
                        Create Product
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default CreateProductModal;
