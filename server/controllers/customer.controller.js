const Customer = require('../models/customer.model');
const Order = require('../models/order.model');

// Get total number of orders for a customer
const getTotalOrders = async (req, res) => {
  const { customerId } = req.params;

  try {
    const customer =
      await Customer.findById(customerId).populate('orderHistory');
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const totalOrders = customer.orderHistory.length;
    res.status(200).json({ totalOrders });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to get total orders', error: error.message });
  }
};

module.exports = { getTotalOrders };
