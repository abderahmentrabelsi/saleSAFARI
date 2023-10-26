
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


interface Order {
    id: number;
    customerId: number;
    productId: string[]; // Utilisez un tableau de chaînes pour productId
    quantity: number;
    price: number;
    total: number;
    status: string;
    date: string;
    address: string;
    payment: string;
}

interface OrderModalProps {
    Order: Order;
}

const OrderModal: React.FC<OrderModalProps> = ({ Order }) => {
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
                    <ModalHeader className="flex flex-col gap-1">Order Details</ModalHeader>
                    <ModalBody>
                        <div>
                            <h2>{Order.id}</h2>
                            <p>{Order.customerId}</p>
                            <p>quantity: {Order.quantity}</p>
                            <p>price: {Order.price}</p>
                            <p>total: {Order.total}</p>
                            <p>status: {Order.status}</p>
                            <p>date: {Order.date}</p>
                            <p>address: {Order.address}</p>
                            <p>payment: {Order.payment}</p>
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

export default OrderModal;