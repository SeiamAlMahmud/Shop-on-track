const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      dbName: 'shopDB', // Explicitly set the database name here
    });
    console.log('DB Connected');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

module.exports = { connectDB };
