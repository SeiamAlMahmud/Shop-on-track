const express = require('express');
const tokenValidationMiddleware = require('../middlewares/auth.middleware');
const {
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
  updateOrderStatus,
} = require('../controllers/order.controller');
const customerOnlyMiddleware = require('../middlewares/customer.middleware');

const router = express.Router();

// Create new order
router.post(
  '/new-order',
  tokenValidationMiddleware,
  customerOnlyMiddleware,
  createOrder
);

// Get Order by ID
router.get('/:id', tokenValidationMiddleware, getOrderById);

// Update Order
router.put('/:id', tokenValidationMiddleware, updateOrder);

// Delete Order
router.delete('/:id', tokenValidationMiddleware, deleteOrder);

// Update Order Status
router.put('/:id/status', tokenValidationMiddleware, updateOrderStatus);

module.exports = router;
