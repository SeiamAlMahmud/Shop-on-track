const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const courierSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    businessName: { type: String, required: true },
    businessLicense: { type: String, required: true },
    bankAccountDetails: { type: String, required: true },
    serviceArea: { type: String, required: true },
    vehicleType: { type: String, required: true },
    vehicleRegistrationNumber: { type: String, required: true },
    driverLicense: { type: String, required: true },
    deliveryCapacity: { type: Number, required: true },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

courierSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('Courier', courierSchema);
