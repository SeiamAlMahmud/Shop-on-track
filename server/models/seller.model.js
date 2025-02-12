const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const sellerSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    businessName: { type: String, required: true },
    businessLicense: { type: String, required: true },
    bankAccountDetails: { type: String, required: true },
    refreshToken: { type: String },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        price: { type: Number, required: true },
        weight: { type: Number, required: true },
        isActive: { type: Boolean, default: true },
        address: {
          division: { type: String, required: true },
          district: { type: String, required: true },
          subDistrict: { type: String, required: true },
        },
        addedAt: { type: Date, default: Date.now },
      },
    ],
    orderHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
      },
    ],
  },
  { timestamps: true }
);

sellerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Ensure orderHistory is initialized as an empty array
sellerSchema.pre('save', function (next) {
  if (!this.orderHistory) {
    this.orderHistory = [];
  }
  next();
});

// Indexes
sellerSchema.index({ email: 1 });
sellerSchema.index({ phoneNumber: 1 });
sellerSchema.index({ businessName: 1 });

module.exports = mongoose.model('Seller', sellerSchema);
