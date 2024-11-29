const express = require('express');
const port = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');
require('dotenv').config();
const path = require('path');

const app = express();
const cors = require('cors');
const { connectDB } = require('./config/DB/connectDB');
connectDB();
const corsOptions = {
  origin: ['http://localhost:5173', 'https://mdoc.almahmud.top'], // Add your frontend URLs
  methods: ['GET', 'POST'], // Specify allowed HTTP methods
  allowedHeaders: ['Authorization', 'Content-Type'], // Allow the Authorization header for Bearer token
};

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use(cookieParser());

app.use(cors(corsOptions));
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
