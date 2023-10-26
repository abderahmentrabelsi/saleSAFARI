"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import Swal from 'sweetalert2';
import { Button } from '@mui/material';
import { useSession } from 'next-auth/react';
import { head } from 'lodash';

const DeliveryShow = () => {
  const [deliveries, setDeliveries] = useState([]);
    const { data } = useSession();

    const markAsDelivered = async (deliveryId) => {
        try {
          await axios.put(`${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/deliveries/${deliveryId}/markAsDelivered` , { headers: { 'Authorization': `Bearer ${data.access_token}` } });
          fetchUserDeliveries();
        } catch (error) {
          console.error('Error marking delivery as delivered:', error);
        }
      };
    
      const deleteDelivery = async (deliveryId) => {
        try {
          const apiUrl = `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/deliveries/${deliveryId}`;
          await axios.delete(apiUrl , { headers: { 'Authorization': `Bearer ${data.access_token}` } });
          fetchUserDeliveries();
        } catch (error) {
          console.error('Error deleting delivery:', error);
        }
      };

  const fetchUserDeliveries = async () => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/deliveries/byName/${data?.user.name}`;
      const response = await axios.get(apiUrl , { headers: { 'Authorization': `Bearer ${data.access_token}` } });
      setDeliveries(response.data);
    } catch (error) {
      console.error('Error fetching user deliveries:', error);
    }
  };

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
        deleteDelivery(deliveryId);
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
        markAsDelivered(deliveryId);
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      if (data?.user.name) {
        const apiUrl = `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/deliveries/byName/${data?.user.name}`;
        // const header = {
        //     'Authorization': `Bearer ${data.access_token}`,
        //     };
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
  }, [data?.user.name]);
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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

export default DeliveryShow;
