'use client';
import useCartContext from '@/context/CartContext'
import { Button, Container, Flex, Text, Title } from '@mantine/core'
import { IconCircleCheck, IconCircleX } from '@tabler/icons-react'
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { Navbar } from '../navbar';

const ThankYou = () => {

  const hasRun = useRef();

  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));

  let params = useSearchParams();
  const { cartItems, clearCart } = useCartContext();
  console.log(params.get('redirect_status'));
  // console.log();
  // console.log(params.get('redirect_status'));
  // const navigate = useNavigate();

  const savePayment = async () => {
    const paymentDetails = await retrievePaymentIntent();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': currentUser.token
      },
      body: JSON.stringify({
        items: cartItems,
        details: paymentDetails,
        intentId: params.get('payment_intent'),
        items: cartItems,
        shipping: JSON.parse(sessionStorage.getItem('shipping'))
      })
    });
    console.log(response.status);
    if (response.status === 200) {
      sessionStorage.removeItem('cartItems');
      sessionStorage.removeItem('shipping');
      clearCart();
    }
    // const data = await response.json();
    // console.log(data);
  }

  const retrievePaymentIntent = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/retrieve-payment-intent`, {
      method: 'POST',
      body: JSON.stringify({ paymentIntentId: params.get('payment_intent') }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(response.status);
    const data = await response.json();
    // console.log(data);
    return data;
  }

  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      if (params.get('redirect_status') === 'succeeded' && sessionStorage.getItem('shipping')) {
        savePayment();
      }
    }
  }, [])


  return (
    <div>
      <Navbar/>
      <Container size={'md'}>

        <Flex justify={'center'} align={'center'} style={{ height: '50vh' }} direction={'column'}>
          {
            params.get('redirect_status') === 'succeeded' ?
              <>
                <IconCircleCheck size={100} color={'green'} />
                <div style={{ textAlign: 'center', padding: '50px' }}>
                  <h1 style={{ color: '#4CAF50' }}>Thank You For Your Purchase!</h1>
                  <p style={{ fontSize: '18px' }}>Your order has been placed successfully.</p>
                  <p style={{ fontSize: '18px' }}>We've sent a confirmation email to your email address.</p>
                </div>
                <Button color='blue' mt={20} component={Link} href="/">Go to Home</Button>
              </>
              :
              <>
                <IconCircleX size={100} color={'red'} />
                <Text size={'xl'}>Payment Failed</Text>
                <Text size={'lg'}>Your payment was not successful. Please try again.</Text>
                <Text size={'lg'}>If the problem persists, please contact us.</Text>
                <Button color='blue' mt={20} component={Link} href="/">Go to Home</Button>
              </>
          }
        </Flex>
      </Container>
    </div>
  )
}

export default ThankYou