import React from 'react';
import DeliveryForm from './deliveryForm';


const DeliveryPage = () => {
  const titleStyle = {
    textAlign: 'center', // Center-align the title
    fontSize: '36px',   // Increase the font size
    marginBottom: '24px', // Add margin at the bottom
  };

  return (
    <div>
        <h1 style={titleStyle}>Delivery</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <DeliveryForm /> 
      </div>
    </div>
  );
};

export default DeliveryPage;

