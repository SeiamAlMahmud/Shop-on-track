const express = require('express');
const port = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');
require('dotenv').config();
const path = require('path');

const app = express();
const cors = require('cors');
const { connectDB } = require('./config/DB/connectDB');
const userRoute = require('./routes/auth.route');
const productRoute = require('./routes/product.route');
const courierRoute = require('./routes/courier.route');

connectDB();
const corsOptions = {
  origin: ['http://localhost:3000'], // Add your frontend URLs
  methods: ['GET', 'POST', "PUT"], // Specify allowed HTTP methods
  allowedHeaders: ['Authorization', 'Content-Type'], // Allow the Authorization header for Bearer token
  credentials: true, // Allow cookies to be sent
};

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use(cookieParser());

app.use(cors(corsOptions));
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// API Endpoints
app.use('/users', userRoute);
app.use('/product', productRoute);
app.use('/courier', courierRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
