"use client"
import React, { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const DeliveryForm = () => {
  const [recipientName, setRecipientName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [isDelivered, setIsDelivered] = useState(false);
  const [deliveryMan, setDeliveryMan] = useState('');
  const { data } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      recipientName,
      deliveryAddress,
      deliveryCost,
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
      <div style={{ marginBottom: '16px' }}>
        <TextField
          label="Recipient Name"
          variant="outlined"
          fullWidth
          value={recipientName}
          onChange={(e) => setRecipientName(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <TextField
          label="Delivery Address"
          variant="outlined"
          fullWidth
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <TextField
          label="Delivery Cost"
          variant="outlined"
          type="number"
          fullWidth
          value={deliveryCost}
          onChange={(e) => setDeliveryCost(parseFloat(e.target.value))}
        />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <FormControlLabel
          control={<Checkbox checked={isDelivered} onChange={(e) => setIsDelivered(e.target.checked)} />}
          label="Is Delivered"
        />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <TextField
          label="Delivery Man (ID)"
          variant="outlined"
          fullWidth
          value={deliveryMan}
          onChange={(e) => setDeliveryMan(e.target.value)}
        />
      </div>
      <Button color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default DeliveryForm;
