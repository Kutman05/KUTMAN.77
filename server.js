const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Добавляем middleware для статических файлов
app.use(express.static(path.join(__dirname, 'public/style.css')));

// Добавляем middleware для статического обслуживания файлов из папки scripts
app.use('/scripts', express.static(path.join(__dirname, 'script.js')));


let serverCartItems = [];

app.post('/addToCart', (req, res) => {
  const item = req.body.item;
  serverCartItems.push(item);
  res.json({ success: true, message: 'Item added to the server cart.' });
});

app.post('/checkout', (req, res) => {
  const orderDetails = req.body.orderDetails;
  console.log('Order details:', orderDetails);
  serverCartItems = [];
  res.json({ success: true, message: 'Order processed successfully.' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Не включайте здесь код из script.js
