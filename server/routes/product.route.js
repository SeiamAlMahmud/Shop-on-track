const express = require('express');

const tokenValidationMiddleware = require('../middlewares/auth.middleware');
const { addProductByAdmin, updateProductBySeller, getProduct } = require('../controllers/product.controller');
const upload = require('../utils/multerConfig');

const router = express.Router();

// router.post("/signup/:role", registration)
router.get('/get-product', getProduct);
router.post('/add-product',upload.single('image'), addProductByAdmin);
router.put('/bid-product',tokenValidationMiddleware, updateProductBySeller);

module.exports = router;
