import fs from 'node:fs/promises';
import bodyParser from 'body-parser';
import express from 'express';

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

// CORS Headers for your frontend requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Get available meals
app.get('/meals', async (req, res) => {
  try {
    const meals = await fs.readFile('./data/available-meals.json', 'utf8');
    res.json(JSON.parse(meals));
  } catch (error) {
    res.status(500).json({ message: 'Failed to load meals' });
  }
});

// Create a new order & clear temp cart on order success
app.post('/orders', async (req, res) => {
  const orderData = req.body.order;

  if (
    !orderData || !orderData.items || orderData.items.length === 0 ||
    !orderData.customer || 
    !orderData.customer.email || !orderData.customer.email.includes('@') ||
    !orderData.customer.name || orderData.customer.name.trim() === '' ||
    !orderData.customer.street || orderData.customer.street.trim() === '' ||
    !orderData.customer['postal-code'] || orderData.customer['postal-code'].trim() === '' ||
    !orderData.customer.city || orderData.customer.city.trim() === ''
  ) {
    return res.status(400).json({ message: 'Missing or invalid order data.' });
  }

  const newOrder = {
    ...orderData,
    id: (Math.random() * 1000000).toFixed(0).toString(),
  };

  try {
    const ordersRaw = await fs.readFile('./data/orders.json', 'utf8');
    const allOrders = JSON.parse(ordersRaw);
    allOrders.push(newOrder);
    await fs.writeFile('./data/orders.json', JSON.stringify(allOrders));
    // Clear temp cart after order
    await fs.writeFile('./data/temp-cart.json', JSON.stringify([]));
    res.status(201).json({ message: 'Order created!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to process order.' });
  }
});

// Get current cart data
app.get('/temp-cart', async (req, res) => {
  try {
    const data = await fs.readFile('./data/temp-cart.json', 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch temp cart data.' });
  }
});

// Update cart data
app.post('/temp-cart', async (req, res) => {
  const cartData = req.body;
  try {
    await fs.writeFile('./data/temp-cart.json', JSON.stringify(cartData));
    res.status(200).json({ message: 'Temp cart updated.' });
  } catch (error) {
    res.status(500).json({ message: 'Could not update temp cart.' });
  }
});

// Clear cart endpoint (optional)
app.post('/temp-cart/clear', async (req, res) => {
  try {
    await fs.writeFile('./data/temp-cart.json', JSON.stringify([]));
    res.status(200).json({ message: 'Temp cart cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to clear temp cart' });
  }
});

// Handle OPTIONS & 404
app.use((req, res) => {
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  res.status(404).json({ message: 'Not found' });
});

app.listen(3000);
console.log('Backend server running on http://localhost:3000');
