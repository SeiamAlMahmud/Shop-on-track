const Order = require('../models/order.model');
const Customer = require('../models/customer.model');
const Seller = require('../models/seller.model');
const Courier = require('../models/courier.model');

// Create Order
const createOrder = async (req, res) => {
  const data = req.body;
  const userId = req.userId;
  data.customerId = userId;

  try {
    const newOrder = new Order(data);
    await newOrder.save();

    // Add order to customer's order history
    await Customer.findByIdAndUpdate(userId, {
      $push: { orderHistory: newOrder._id },
    });

    // Add order to seller's order history
    await Seller.findByIdAndUpdate(data.sellerId, {
      $push: { orderHistory: newOrder._id },
    });

    // Add order to courier's order history
    await Courier.findByIdAndUpdate(data.courierId, {
      $push: { orderHistory: newOrder._id },
    });

    res
      .status(201)
      .json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to create order', error: error.message });
  }
};

// Get Order by ID
const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id).populate(
      'productId sellerId customerId courierId'
    );
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to get order', error: error.message });
  }
};

// Update Order
const updateOrder = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res
      .status(200)
      .json({ message: 'Order updated successfully', order: updatedOrder });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to update order', error: error.message });
  }
};

// Update Order Status
const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res
      .status(200)
      .json({
        message: 'Order status updated successfully',
        order: updatedOrder,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to update order status', error: error.message });
  }
};

// Delete Order
const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to delete order', error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
  updateOrderStatus,
};
