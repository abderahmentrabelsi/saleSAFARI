"use client"
import React, { useState } from 'react';
import { Input } from "@nextui-org/react";

const Page: React.FC = () => {
    const [customerId, setCustomerId] = useState<number | string>('');
    const [productId, setProductId] = useState<string>('');
    const [quantity, setQuantity] = useState<number | string>('');
    const [price, setPrice] = useState<number | string>('');
    const [total, setTotal] = useState<number | string>('');
    const [status, setStatus] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [payment, setPayment] = useState<string>('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log({
            customerId,
            productId,
            quantity,
            price,
            total,
            status,
            date,
            address,
            payment,
        });
    };

    return (
        <div className="flex flex-wrap gap-4">
            <Input type="number" label="Customer ID" value={customerId} onChange={(e) => setCustomerId(Number(e.target.value))} />
            <Input type="text" label="Product ID" value={productId} onChange={(e) => setProductId(e.target.value)} />
            <Input type="number" label="Quantity" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
            <Input type="number" label="Price" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
            <Input type="number" label="Total" value={total} onChange={(e) => setTotal(Number(e.target.value))} />
            <Input type="text" label="Status" value={status} onChange={(e) => setStatus(e.target.value)} />
            <Input type="date" label="Date" value={date} onChange={(e) => setDate(e.target.value)} />
            <Input type="text" label="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
            <Input type="text" label="Payment" value={payment} onChange={(e) => setPayment(e.target.value)} />
            <button type="submit" className="btn" onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default Page;
