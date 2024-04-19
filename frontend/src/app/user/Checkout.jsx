import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import PaymentGateway from './checkout/PaymentGateway';
import { Elements } from '@stripe/react-stripe-js';
import { Box, Button, Container, Flex, Loader, NumberInput, Text, TextInput, Title } from '@mantine/core';
import { useParams } from 'react-router-dom';

const appearance = {
    theme: 'stripe'
};

const Checkout = () => {

    const { tutorid } = useParams();

    const hasRun = useRef(false);
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
    console.log(stripePromise);
    const [clientSecret, setClientSecret] = useState('');
    const [tutorDetails, setTutorDetails] = useState(null);

    const [selHrs, setSelHrs] = useState(10);

    // const [ stripePromise, setStripePromise ] = useState(null);
    const fetchTutorData = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/tutor/getbyid/${tutorid}`);
        console.log(response.status);
        const data = await response.json();
        console.log(data);
        setTutorDetails(data);
    }

    useEffect(() => {
        fetchTutorData();
    }, [])

    const getPaymentIntent = async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/create-payment-intent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: tutorDetails.pricing * selHrs })
        });
        const data = await res.json();
        console.log(data);
        setClientSecret(data.clientSecret);
    }

    const displayTutorDetails = () => {
        if (tutorDetails !== null) {
            return (
                <Box my={40}>
                    <Title order={3} mb={20}>Paying To</Title>
                    <Flex gap={30} align={'start'}>

                        <img style={{objectFit: 'contain'}} width={200} src={`${import.meta.env.VITE_API_URL}/${tutorDetails.avatar}`} alt={tutorDetails.name} />
                        <Box>
                            <Text size='xl' fw={'bold'}>{tutorDetails.name}</Text>
                            <Text size='md'>{tutorDetails.email}</Text>
                            <Text size='md'>{tutorDetails.experience}+ years of experience</Text>
                            <Text size='xl' fw={'bold'}>Pricing: ₹{tutorDetails.pricing}</Text>
                            <Flex gap={10} align={'center'} my={20}>

                                <Text size='lg'>Paying for : </Text>
                                <NumberInput value={selHrs} onChange={v => setSelHrs(v)} min={5} max={60} />
                                <Text size='lg'>Hours</Text>
                            </Flex>
                            <Text size='xl' fw={'bold'}>Total Amount: ₹{tutorDetails.pricing * selHrs}</Text>
                            <Button mt={30} onClick={getPaymentIntent}>Pay Now</Button>
                        </Box>
                    </Flex>

                </Box>
            )
        } else {
            return (
                <Loader />
            )
        }
    }

    return (
        <Box>
            <Container size={'lg'}>
                {
                    displayTutorDetails()
                }
                {
                    clientSecret && (
                        <Elements stripe={stripePromise} options={{
                            clientSecret,
                            appearance
                        }}>
                            <PaymentGateway tutorid={tutorid} />
                        </Elements>
                    )
                }
            </Container>
        </Box>
    )
}

export default Checkout