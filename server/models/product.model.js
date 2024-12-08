const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    titleBn: { type: String, required: true },
    description: { type: String, required: true },
    descriptionBn: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    image: { type: String, required: true },
    sellers: [
      {
        sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
        price: { type: Number, required: true },
        address: {
          division: { type: String, required: true },
          district: { type: String, required: true },
          subDistrict: { type: String, required: true },
        },
        addedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
