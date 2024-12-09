const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, // Category name (e.g., Electronics, Fashion)
    nameBn: { type: String, required: true }, // Bangla translation of the category
    description: { type: String }, // Optional description for the category
    parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, // For subcategories (optional)
    image: { type: String }, // Optional image for the category
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
