"use client"
import React, { useState } from 'react';
import { Button, Checkbox, FormControlLabel } from '@mui/material';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { Input } from '@nextui-org/react';

const DeliveryForm = () => {
  const [recipientName, setRecipientName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [orderId, setOrderId] = useState(0);
  const [isDelivered, setIsDelivered] = useState(false);
  const [deliveryMan, setDeliveryMan] = useState('');
  const { data } = useSession();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      recipientName:data?.user.name,
      deliveryAddress,
      deliveryCost,
      orderId,
      isDelivered,
      deliveryMan,
    };

    try {
      const apiUrl = 'http://localhost:8081/DELIVERYMS/deliveries';

      const headers = {
        'Authorization': `Bearer ${data.access_token}`,
        'Content-Type': 'application/json',
      };
      const response = await axios.post(apiUrl, formData, { headers });

      console.log('Delivery submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting delivery:', error);
    }
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <Input
        label="Recipient Name"
        type="text"
        value={recipientName}
        placeholder={data?.user.name}
        onChange={(e) => setRecipientName(e.target.value)}
        className="mb-3"
        disabled
      />
      <Input
        label="Delivery Address"
        type="text"
        value={deliveryAddress}
        onChange={(e) => setDeliveryAddress(e.target.value)}
        className="mb-3"
      />
      <Input
        label="Delivery Cost"
        type="number"
        value={deliveryCost}
        onChange={(e) => setDeliveryCost(parseFloat(e.target.value))}
        className="mb-3"
        placeholder="Delivery Cost"
        />
        <Input
        label="Order ID"
        type="number"
        value={orderId}
        onChange={(e) => setOrderId(parseInt(e.target.value))}
        className="mb-3"
        placeholder="Order ID"
        />
      <FormControlLabel
        control={<Checkbox checked={isDelivered} onChange={(e) => setIsDelivered(e.target.checked)} />}
        label="Is Delivered"
        className="mb-3"
      />
      <Input
        label="Delivery Man (ID)"
        type="text"
        value={deliveryMan}
        onChange={(e) => setDeliveryMan(e.target.value)}
        className="mb-3"
      />
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default DeliveryForm;
