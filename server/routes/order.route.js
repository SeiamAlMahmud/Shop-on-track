const express = require('express');
const tokenValidationMiddleware = require('../middlewares/auth.middleware');
const { createOrder } = require('../controllers/order.controller');
const customerOnlyMiddleware = require('../middlewares/customer.middleware');



const router = express.Router();

// Create new order
router.post('/new-order', tokenValidationMiddleware, customerOnlyMiddleware, createOrder);


module.exports = router;
