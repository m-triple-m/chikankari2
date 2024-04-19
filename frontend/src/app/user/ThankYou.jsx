import { Button, Container, Flex, Text, Title } from '@mantine/core'
import { IconCircleCheck, IconCircleX } from '@tabler/icons-react'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

const ThankYou = () => {

  const hasRun = useRef();

  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));
  const { tutorid } = useParams();
  const location = useLocation();
  let params = new URLSearchParams(location.search);
  // console.log();
  // console.log(params.get('redirect_status'));
  // const navigate = useNavigate();

  const savePayment = async () => {
    const paymentDetails = await retrievePaymentIntent();
    const response = await fetch(`${import.meta.env.VITE_API_URL}/payment/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: currentUser._id,
        tutor: tutorid,
        details: paymentDetails,
        intentId: params.get('payment_intent'),
        // hours: selHrs
      })
    });
    console.log(response.status);
    // const data = await response.json();
    // console.log(data);
  }

  const retrievePaymentIntent = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/retrieve-payment-intent`, {
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
      if (params.get('redirect_status') === 'succeeded') {
        savePayment();
      }
    }
  }, [])


  return (
    <div>
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
                <Button color='blue' mt={20} component={Link} to="/">Go to Home</Button>
              </>
              :
              <>
                <IconCircleX size={100} color={'red'} />
                <Text size={'xl'}>Payment Failed</Text>
                <Text size={'lg'}>Your payment was not successful. Please try again.</Text>
                <Text size={'lg'}>If the problem persists, please contact us.</Text>
                <Button color='blue' mt={20} component={Link} to="/">Go to Home</Button>
              </>
          }
        </Flex>
      </Container>
    </div>
  )
}

export default ThankYou