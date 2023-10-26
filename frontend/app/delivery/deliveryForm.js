"use client"
import React, { useState, useEffect } from 'react';
import { Button, Checkbox, FormControlLabel, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, SelectItem } from '@nextui-org/react';
import { de } from 'date-fns/locale';
import Swal from 'sweetalert2';


const DeliveryForm = () => {
  const [recipientname, setRecipientName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [orderId, setOrderId] = useState(0);
  const [delivered, setDelivered] = useState(false);
  const [deliveryMan, setDeliveryMan] = useState('');
  const { data } = useSession();
  const [deliveries, setDeliveries] = useState([]);
  const [couriers, setCouriers] = useState([]);
  const [courierId, setCourierId] = useState('');

  const fetchCouriers = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/couriers` , { headers: { 'Authorization': `Bearer ${data.access_token}` } } );
      setCouriers(response.data);
    } catch (error) {
      console.error('Error fetching couriers:', error);
    }
  };

  const fetchUserDeliveries = async () => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/deliveries/byName/${data?.user.name}`;
      const headers = {
        'Authorization': `Bearer ${data.access_token}`,
      };
      const response = await axios.get(apiUrl , { headers });
      setDeliveries(response.data);
    } catch (error) {
      console.error('Error fetching user deliveries:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      recipientname: data?.user.name,
      deliveryAddress,
      deliveryCost,
      order_id: orderId, // Change the field name to "order_id"
      isDelivered: false,
      deliveryMan: {
        cin: deliveryMan, // Add a nested "deliveryMan" field
      },
    };

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/deliveries`;

      const headers = {
        'Authorization': `Bearer ${data.access_token}`,
        'Content-Type': 'application/json',
      };
      const response = await axios.post(apiUrl, formData, { headers });
      fetchUserDeliveries();

      console.log('Delivery submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting delivery:', error);
    }
  };

  const markAsDelivered = async (deliveryId) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/deliveries/${deliveryId}/markAsDelivered` , { headers: { 'Authorization': `Bearer ${data.access_token}` } });
      setDelivered(true);
    } catch (error) {
      console.error('Error marking delivery as delivered:', error);
    }
    fetchUserDeliveries();
  };

  const deleteDelivery = async (deliveryId) => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/deliveries/${deliveryId}`;
      const headers = {
        'Authorization': `Bearer ${data.access_token}`,
      };
      await axios.delete(apiUrl, { headers });
    } catch (error) {
      console.error('Error deleting delivery:', error);
    }
    fetchUserDeliveries();
  };
  useEffect(() => {
    const fetchData = async () => {
      if (data?.user.name) {
        const apiUrl = `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/deliveries/byName/${data?.user.name}`;
        try {
          const response = await axios.get(apiUrl , { headers: { 'Authorization': `Bearer ${data.access_token}` } });
          console.log('Deliveries fetched successfully:', response.data);
          setDeliveries(response.data);
        } catch (error) {
          console.error('Error fetching user deliveries:', error);
        }
      }
    };

    fetchData();
    fetchCouriers();
  }, [data?.user.name]);

  const showDeleteConfirmation = (deliveryId) => {
    Swal.fire({
      title: 'Delete Delivery?',
      text: 'Are you sure you want to delete this delivery?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDelivery(deliveryId); // Call the delete function if confirmed
      }
    });
  };

  const showDeliveredConfirmation = (deliveryId) => {
    Swal.fire({
      title: 'Mark as Delivered?',
      text: 'Are you sure you want to mark this delivery as delivered?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes, mark as delivered',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        markAsDelivered(deliveryId); // Call the markAsDelivered function if confirmed
      }
    });
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={formStyle}>
        <Input
          label="Recipient Name"
          type="text"
          value={recipientname}
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
        <FormControl className="mb-3" style={{ width: '100%', backgroundColor: 'grey', borderRadius: '10px' }}>
          <InputLabel id="courier-label">Select Courier</InputLabel>
          <Select
            labelId="courier-label"
            id="courier"
            value={deliveryMan}
            onChange={(e) => setDeliveryMan(e.target.value)}
            style={{ width: '100%' }}
            inputProps={{ style: { color: 'white' } }} // Set text color to white
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {couriers.map((courier) => (
              <MenuItem key={courier.cin} value={courier.cin}>
                {courier.firstName} {courier.lastName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={fetchUserDeliveries}
          style={{ marginBottom: '20px' }}
        >
          Show Your Deliveries
        </Button>
        <Table aria-label="User Deliveries">
          <TableHeader>
            <TableColumn>Recipient Name</TableColumn>
            <TableColumn>Delivery Address</TableColumn>
            <TableColumn>Delivery Cost</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>
          <TableBody>
            {deliveries.map((delivery, index) => (
              <TableRow key={index}>
                <TableCell>{delivery.recipientname}</TableCell>
                <TableCell>{delivery.deliveryAddress}</TableCell>
                <TableCell>${delivery.deliveryCost.toFixed(2)}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={() => showDeliveredConfirmation(delivery.id)}
                    disabled={delivery.delivered}
                  >
                    Delivered
                  </Button>
                  <Button
                    color="error"
                    onClick={() => showDeleteConfirmation(delivery.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DeliveryForm;
