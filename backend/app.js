import fs from 'node:fs/promises';
import bodyParser from 'body-parser';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

const TEMP_CART_PATH = path.join(__dirname, 'data', 'temp-cart.json');


async function initializeTempCart() {
  try {
    const data = await fs.readFile(TEMP_CART_PATH, 'utf8');
    const parsedData = JSON.parse(data);
    if (!Array.isArray(parsedData)) {
      await fs.writeFile(TEMP_CART_PATH, JSON.stringify([]));
    }
  } catch (error) {
    await fs.writeFile(TEMP_CART_PATH, JSON.stringify([]));
  }
}


initializeTempCart();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Get available meals
app.get('/meals', async (req, res) => {
  try {
    const meals = await fs.readFile(path.join(__dirname, 'data', 'available-meals.json'), 'utf8');
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
    const ordersRaw = await fs.readFile(path.join(__dirname, 'data', 'orders.json'), 'utf8');
    const allOrders = JSON.parse(ordersRaw);
    allOrders.push(newOrder);
    await fs.writeFile(path.join(__dirname, 'data', 'orders.json'), JSON.stringify(allOrders));
    // Clear temp cart after order
    await fs.writeFile(TEMP_CART_PATH, JSON.stringify([]));
    res.status(201).json({ message: 'Order created!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to process order.' });
  }
});

// Get current cart data
app.get('/temp-cart', async (req, res) => {
  try {
    const data = await fs.readFile(TEMP_CART_PATH, 'utf8');
    console.log('Raw data from file:', data);
    const parsedData = JSON.parse(data);
    console.log('Parsed data:', parsedData);
    res.json(parsedData);
  } catch (error) {
    console.error('Error reading temp-cart:', error);
    res.status(500).json({ message: 'Could not fetch temp cart data.' });
  }
});

// Update cart data
app.post('/temp-cart', async (req, res) => {
  const cartData = req.body;
  try {
    console.log('Writing to temp-cart:', cartData);
    await fs.writeFile(TEMP_CART_PATH, JSON.stringify(cartData));
    res.status(200).json({ message: 'Temp cart updated.' });
  } catch (error) {
    console.error('Error writing to temp-cart:', error);
    res.status(500).json({ message: 'Could not update temp cart.' });
  }
});

// Clear cart endpoint (optional)
app.post('/temp-cart/clear', async (req, res) => {
  try {
    await fs.writeFile(TEMP_CART_PATH, JSON.stringify([]));
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
