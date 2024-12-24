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
    bookingAvailability: { type: Boolean, default: true },
    bookingDates: [{ type: Date }],
    vehicleStatus: { type: String, enum: ['available', 'busy'], default: 'available' },
    division: { type: String, default: "" },
    district: { type: String, default: "" },
    subDistrict: { type: String, default: "" },
    vehicleHistory: [
      {
        startLocation: { type: String, required: true },
        endLocation: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        isComplete: { type: Boolean, default: false },
      }
    ],
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  },
  { timestamps: true }
);

courierSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

courierSchema.methods.addBookingDate = function (date) {
  this.bookingDates.push(date);
  this.vehicleStatus = 'busy';
  return this.save();
};

courierSchema.methods.addVehicleHistory = function (startLocation, endLocation, startDate, endDate) {
  this.vehicleHistory.push({ startLocation, endLocation, startDate, endDate, isComplete: false });
  return this.save();
};

module.exports = mongoose.model('Courier', courierSchema);
