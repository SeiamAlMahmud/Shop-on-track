const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const customerSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    shippingAddress: { type: String, required: true },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: true,
    },
    dateOfBirth: { type: Date },
    refreshToken: { type: String },
    orderHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
      }
    ],
  },
  { timestamps: true }
);

customerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Ensure orderHistory is initialized as an empty array
customerSchema.pre('save', function (next) {
  if (!this.orderHistory) {
    this.orderHistory = [];
  }
  next();
});

// Indexes
customerSchema.index({ email: 1 });
customerSchema.index({ phoneNumber: 1 });

module.exports = mongoose.model('Customer', customerSchema);
