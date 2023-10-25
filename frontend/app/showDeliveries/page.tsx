import React from 'react';
import DeliveryShow from './deliveryShow';


const DeliveryShowPage = () => {
  const titleStyle = {
    textAlign: 'center', // Center-align the title
    fontSize: '36px',   // Increase the font size
    marginBottom: '24px', // Add margin at the bottom
  };

  return (
    <div>
        <h1 style={titleStyle}>Your Deliveries</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <DeliveryShow /> 
      </div>
    </div>
  );
};

export default DeliveryShowPage;

