import { Container } from '@mantine/core';
import React, { useEffect, useState } from 'react'

const PaymentHistory = () => {

  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));

  const [paymentData, setPaymentData] = useState([]);

  const fetchPaymentHistory = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/payment/getbyuser/${currentUser._id}`);
    const data = await response.json();
    console.log(data);
    setPaymentData(data);
  }

  useEffect(() => {
    fetchPaymentHistory();
  }, [])


  const displayPaymentHistory = () => {
    return paymentData.map((payment, index) => {
      return (
        <div key={index}>
          <p>{payment.tutor.name}</p>
          <p>{payment.details.amount}</p>
          <p>{payment.createdAt}</p>
        </div>
      )
    })
  }

  return (
    <div>
      <Container>
        <h1>Payment History</h1>
        {displayPaymentHistory()}
      </Container>
    </div>
  )
}

export default PaymentHistory