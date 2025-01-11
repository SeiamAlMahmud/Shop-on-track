const Courier = require('../models/courier.model');

// ...existing code...

const getCourierProfile = async (req, res) => {
  try {
    const courierId = req.userId;
    const courier = await Courier.findById(courierId).select('-password');
    if (!courier) {
      return res.status(404).json({ message: 'Courier not found' });
    }
    res.status(200).json(courier);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

const updateCourierProfile = async (req, res) => {
  try {
    const courierId = req.userId;
    const {
      bookingAvailability, // true or false
      vehicleStatus, // 'available' or 'busy'
      division, // string
      district, // string
      subDistrict, // string
    } = req.body;

    const courier = await Courier.findById(courierId).select('-password');
    if (!courier) {
      return res.status(404).json({ message: 'Courier not found' });
    }

    courier.bookingAvailability = bookingAvailability;
    courier.vehicleStatus = vehicleStatus;
    courier.division = division;
    courier.district = district;
    courier.subDistrict = subDistrict;

    await courier.save();
    res
      .status(200)
      .json({ message: 'Courier profile updated successfully', courier });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

module.exports = {
  // ...existing code...
  getCourierProfile,
  updateCourierProfile,
};
