'use client';
import React, { useContext } from 'react';
import {
  Container,
  Group,
  Text,
  Title,
  Divider,
  Button,
  Card,
  TextInput,
  Spacer,
  Grid,
} from '@mantine/core';
import useCartContext from '@/context/CartContext';
import { IconTrash } from '@tabler/icons-react';
import Link from 'next/link';

const CartPage = () => {
  const { cartItems, cartTotalAmount, addItem, removeItem, clearItem, clearCart } = useCartContext();

  console.log(cartItems);
  const handleRemoveItem = (itemId) => {
    removeItem(itemId);
  };

  const handleInputChange = (itemId, newQuantity) => {
    addItem(itemId, newQuantity);
  };

  return (
    <Container size="md">
      <Title>Shopping Cart</Title>
      {cartItems.length === 0 ? (
        <Text>Your cart is currently empty.</Text>
      ) : (
        <>
          <Group direction="column">
            {cartItems.map((item) => (
              <Card key={item._id} shadow="sm" radius="md" withBorder w={'100%'}>
                <Grid gutter={5}>
                  <Grid.Col span={2}>
                    <img src={`${process.env.NEXT_PUBLIC_API_URL}/${item.image[0]}`} alt={item.name} width={'100%'} />

                  </Grid.Col>
                  <Grid.Col span={6} py={20}>

                    <Text weight="bold" c="dimmed" tt={'uppercase'}>{item.category}</Text>
                    <Text weight="bold">{item.title}</Text>
                    <Title order={3}>₹{item.price.toFixed(2)}</Title>
                  </Grid.Col>
                  <Grid.Col span={4} py={20}>
                    <Button color='red' ml={'auto'} size="xs" variant="outline" onClick={() => handleRemoveItem(item)}>
                      <IconTrash />
                    </Button>
                    <TextInput
                      label="Quantity"
                      placeholder="1"
                      value={item.quantity.toString()}
                      onChange={(e) => handleInputChange(item._id, parseInt(e.target.value))}
                    />
                  </Grid.Col>
                </Grid>
              </Card>
            ))}
          </Group>
          <Divider my="md" />
          <Group direction="row" justify="space-between">
            <Text>Total: ₹{cartTotalAmount.toFixed(2)}</Text>
            <Group>
              <Button onClick={clearCart} variant="outline">Clear Cart</Button>
              <Button component={Link} href="/user/checkout" variant="filled">Checkout</Button>
            </Group>
          </Group>
        </>
      )}
    </Container>
  );
};

export default CartPage;
