const fs = require('fs');
const Product = require('../models/product.model');
const sellerModel = require('../models/seller.model');





// Add Product by Admin
const addProductByAdmin = async (req, res) => {
  try {
    const { title, titleBn, description, descriptionBn, category } = req.body;
    let imagePath;

    // Handle local image upload
    if (req.file) {
      imagePath = req.file.path;

      // Future: Cloudinary integration example
      // const uploadedImage = await cloudinary.uploader.upload(req.file.path);
      // imagePath = uploadedImage.secure_url;

      // Optional: Remove local image after uploading to Cloudinary
      // fs.unlinkSync(req.file.path);
    }

    // Create a new product
    const newProduct = new Product({
      title,
      titleBn,
      description,
      descriptionBn,
      category,
      image: imagePath,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({
      success: true,
      message: 'Product added successfully',
      product: savedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error adding product', error });
  }
};


const updateProductBySeller = async (req, res) => {
  try {
    const { productId, price, division, district, subDistrict } = req.body;
    const sellerId = req.userId; // Extract seller ID from the authenticated user
    const userType = req.role; // Extract user role
    console.log(sellerId,userType, req.body, "req.body")
    if (userType !== "seller") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Only sellers can update products",
      });
    }

    // Validate required fields
    if (!productId || !price || !division || !district || !subDistrict) {
      return res.status(400).json({
        success: false,
        message: "All fields (productId, price, division, district, subDistrict) are required",
      });
    }

    // Update the Product schema
    const productUpdate = await Product.findByIdAndUpdate(
      productId,
      {
        $push: {
          sellers: {
            sellerId,
            price,
            address: { division, district, subDistrict },
          },
        },
      },
      { new: true }
    );

    if (!productUpdate) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Update the Seller schema
    const sellerUpdate = await sellerModel.findByIdAndUpdate(
      sellerId,
      {
        $push: {
          products: {
            productId,
            price,
            address: { division, district, subDistrict },
          },
        },
      },
      { new: true }
    );

    if (!sellerUpdate) {
      return res.status(404).json({
        success: false,
        message: "Seller not found",
      });
    }

    // Respond with success
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: productUpdate,
      seller: sellerUpdate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error updating product",
      error: error.message,
    });
  }
};


const getProduct = async (req, res) => {
try {
  
  const result = await Product.find()

  res.status(200).json({ success: true, message: 'Product fetched successfully', product: result });
} catch (error) {
  console.error(error);
  res.status(500).json({ success: false, message: 'Error adding product', error });
}
}


module.exports = { addProductByAdmin, updateProductBySeller, getProduct };
