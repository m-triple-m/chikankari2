// import express
const express = require('express');
const userrouter = require('./routers/userrouter');
const productrouter = require('./routers/productrouter')
const utilROuter = require('./routers/utils')
const reviewRouter = require('./routers/reviewRouter')
const orderRouter = require('./routers/orderRouter')

const cors = require('cors')
// initialize express app

const app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const port = 5000;

//middleware
app.use(cors(
    { origin: ['http://localhost:3000'] }
));

app.use(express.json());

app.use('/user', userrouter);
app.use('/product', productrouter);
app.use('/util', utilROuter);
app.use('/review', reviewRouter);
app.use('/order', orderRouter);

app.get('/get-permission', (req, res) => {
    const token = req.header('x-auth-token');
    console.log(token);
    if(token === 'admin'){
        res.json({allowed: true});
    }else{
        res.json({allowed: false});
    }
})

app.use(express.static('./static/uploads'));

app.post('/create-payment-intent', async (req, res) => {
    const { amount, customerData } = req.body;
    // const { name, address } = customerData;
    console.log(amount);
    const customer = await stripe.customers.create(customerData);
    console.log(customer.id);
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'inr',
      description: 'Payment Description',
      customer : customer.id
    });
    res.json({
      clientSecret: paymentIntent.client_secret
    });
  });
  
  app.post('/retrieve-payment-intent', async (req, res) => {
    const { paymentIntentId } = req.body;
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    res.json(paymentIntent);
  });

app.listen(port, () => { console.log('server started'); });
