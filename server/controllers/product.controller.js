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
    const { productId, price, weight, division, district, subDistrict } = req.body;
    const sellerId = req.userId; // Extract seller ID from the authenticated user
    const user = req.user; // Extract seller ID from the authenticated user
    const userType = req.role; // Extract user role
    console.log(sellerId, userType, req.body, "req.body")
    if (userType !== "seller") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Only sellers can update products",
      });
    }

    // Validate required fields
    if (!productId || !price || !weight || !division || !district || !subDistrict) {
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
            fullName: user.fullName,
            weight,
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
            weight,
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
    // Fetch products where at least one seller has 'isActive' set to true
    const result = await Product.find({ 'sellers.isActive': true });

    if (!result || result.length === 0) {
      return res.status(400).json({ success: false, message: 'No active products found.' });
    }

    res.status(200).json({ success: true, message: 'Product fetched successfully', product: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching products', error });
  }
};



const getSingleProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      return res.status(400).json({ success: false, message: 'Product ID is required' });
    }

    // Fetch the product and ensure it's active
    const product = await Product.findOne({ _id: productId, 'sellers.isActive': true });

    if (!product) {
      return res.status(400).json({ success: false, message: 'Product not found or is inactive.' });
    }

    res.status(200).json({ success: true, message: 'Product fetched successfully', product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error finding specific product', error });
  }
};


module.exports = { addProductByAdmin, updateProductBySeller, getProduct, getSingleProduct };
