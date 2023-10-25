// ProductModal.tsx

import React from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Checkbox,
    Input,
    Link,
} from "@nextui-org/react";


interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    rating: number;
    image: string;
}

interface ProductModalProps {
    product: Product;
}

const ProductModal: React.FC<ProductModalProps> = ({ product }) => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const handleButtonCLick = () => {
        onOpen();
    };

    return (
        <>
            <Button onPress={handleButtonCLick} color="primary">
                View Details
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Product Details</ModalHeader>
                    <ModalBody>
                        <div>
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <p>Rating: {product.rating}</p>
                            {/* You can add more details as needed */}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onPress={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ProductModal;
