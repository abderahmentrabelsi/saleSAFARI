'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react';
import axios from 'axios';
import Swal from 'sweetalert2';

interface Order {
  id: number;
  customerId: string;
  productId: string[]; // Utilisez un tableau de chaînes pour productId
  quantity: number;
  price: number;
  total: number;
  status: string;
  date: string;
  address: string;
  payment: string;
}

export default function OrderCard({ userId }: { userId: string }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const { data: session } = useSession();
  async function fetchOrders() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_ORDER_API_URL}/${userId}`,
        { headers: { Authorization: `Bearer ${session?.access_token}` } }
      );
      const data = await response.json();
      setOrders(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }
  useEffect(() => {
    fetchOrders();
  }, []);

  const deleteDelivery = async (orderId: number) => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_ORDER_API_URL}/order/del/${orderId}`;

      await axios.delete(apiUrl, {
        headers: { Authorization: `Bearer ${session?.access_token}` }
      });
    } catch (error) {
      console.error('Error deleting delivery:', error);
    }
    fetchOrders();
  };

  const showDeleteConfirmation = (orderId: number) => {
    Swal.fire({
      title: 'Delete Delivery?',
      text: 'Are you sure you want to delete this delivery?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDelivery(orderId); // Call the delete function if confirmed
      }
    });
  };

  return (
    <>
      <Table aria-label="User Orders">
        <TableHeader>
          <TableColumn>Recipient Name</TableColumn>
          <TableColumn>Delivery Address</TableColumn>
          <TableColumn>Delivery Cost</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {orders.map((order, index) => (
            <TableRow key={index}>
              <TableCell>{order.customerId}</TableCell>
              <TableCell>{order.address}</TableCell>
              <TableCell>${order.price.toFixed(2)}</TableCell>
              <TableCell>
                <Button
                  color="danger"
                  onClick={() => showDeleteConfirmation(order.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
