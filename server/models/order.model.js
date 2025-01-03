const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    title: { type: String, required: true }, // Change to String
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    courierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Courier', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now, required: true },
    deliveryDate: {
      type: Date,
      required: true,
      default: function () {
        const orderDate = new Date();
        const deliveryDays = Math.floor(Math.random() * 5) + 3; // Random number between 3 and 7
        orderDate.setDate(orderDate.getDate() + deliveryDays);
        return orderDate;
      }
    },
    status: {
      type: String, enum: ['pending', 'shipped', 'delivered', 'cancelled'],
      default: 'pending'
    },
    deliveryCharge: { type: Number, required: true },
    netAmount: { type: Number, default: 10 },
    location: {
      division: { type: String, required: true },
      district: { type: String, required: true },
      subDistrict: { type: String, required: true },
    },
  },
  { timestamps: true }
);

// Indexes
orderSchema.index({ productId: 1 });
orderSchema.index({ sellerId: 1 });
orderSchema.index({ customerId: 1 });
orderSchema.index({ courierId: 1 });
orderSchema.index({ orderDate: 1 });

module.exports = mongoose.model('Order', orderSchema);
