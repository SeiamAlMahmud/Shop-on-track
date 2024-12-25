const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    courierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Courier', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    orderDate: { type: Date, required: true },
    deliveryDate: { type: Date },
    status: { type: String, enum: ['pending', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
    address: {
      division: { type: String, required: true },
      district: { type: String, required: true },
      subDistrict: { type: String, required: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
