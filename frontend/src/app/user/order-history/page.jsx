"use client";
import React, { useEffect, useState } from 'react';
import { Container, Title, Text, Paper, Grid, Loader } from '@mantine/core';

const OrderHistory = () => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));
  const [paymentData, setPaymentData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPaymentHistory = async () => {
    setLoading(true);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/getbyuser`, {
      headers: {
        'x-auth-token': currentUser.token
      }
    });
    const data = await response.json();
    console.log(data);
    setPaymentData(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchPaymentHistory();
  }, []);

  return (
    <Container size="lg">
      <Title order={1} align="center" my={20}>Order History</Title>
      
      <Paper padding="lg" shadow="md" p={20} >
      {loading ? (
        <Loader />
      ) : (
        paymentData.map((order, index) => (
            <Grid gutter="md" key={order._id} mb={20}>
              <Grid.Col span={6}>
                <Text size='sm' c={'dimmed'}>Shipping Address</Text>
                <Text>{order.shipping.name}</Text>
                <Text>{order.shipping.address.line1}</Text>
                <Text>{order.shipping.address.postal_code}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text size='sm' c={'dimmed'}>Order Details</Text>
                <Text>Order ID: {order._id}</Text>
                <Text>Amount: ₹{order.details.amount/100}</Text>
                <Text>Payment Status: {order.paymentStatus}</Text>
              </Grid.Col>
            </Grid>
        ))
      )}
      </Paper>
    </Container>
  );
};

export default OrderHistory;