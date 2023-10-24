"use client"
import React, { useState } from 'react';

const DeliveryForm = () => {
  const [recipientName, setRecipientName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [isDelivered, setIsDelivered] = useState(false);
  const [deliveryMan, setDeliveryMan] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle form submission here
    const formData = {
      recipientName,
      deliveryAddress,
      deliveryCost,
      isDelivered,
      deliveryMan,
    };

    console.log(formData); // Replace with your API call or data handling logic
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Recipient Name</label>
        <input
          type="text"
          value={recipientName}
          onChange={(e) => setRecipientName(e.target.value)}
        />
      </div>

      <div>
        <label>Delivery Address</label>
        <input
          type="text"
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
        />
      </div>

      <div>
        <label>Delivery Cost</label>
        <input
          type="number"
          value={deliveryCost}
          onChange={(e) => setDeliveryCost(parseFloat(e.target.value))}
        />
      </div>

      <div>
        <label>Is Delivered</label>
        <input
          type="checkbox"
          checked={isDelivered}
          onChange={(e) => setIsDelivered(e.target.checked)}
        />
      </div>

      <div>
        <label>Delivery Man (ID)</label>
        <input
          type="text"
          value={deliveryMan}
          onChange={(e) => setDeliveryMan(e.target.value)}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default DeliveryForm;
