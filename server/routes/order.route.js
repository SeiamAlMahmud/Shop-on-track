const express = require('express');
const tokenValidationMiddleware = require('../middlewares/auth.middleware');
const { createOrder } = require('../controllers/order.controller');



const router = express.Router();

// Create new order
router.post('/new', tokenValidationMiddleware, createOrder);


module.exports = router;
