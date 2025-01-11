const express = require('express');

const tokenValidationMiddleware = require('../middlewares/auth.middleware');
const { addProductByAdmin, updateProductBySeller, getProduct, getSingleProduct, getCouriersOnBaseSeller, getAllProduct } = require('../controllers/product.controller');
const upload = require('../utils/multerConfig');
const { createOrder } = require('../controllers/order.controller');

const router = express.Router();

// router.post("/signup/:role", registration)
router.get('/get-product', getProduct);
router.get('/get-All-product', getAllProduct);
router.get('/get-single-product/:productId', getSingleProduct);
router.post('/getCouriersOnBaseSeller/:sellerId', getCouriersOnBaseSeller);
router.post('/add-product',upload.single('image'), addProductByAdmin);
router.put('/bid-product',tokenValidationMiddleware, updateProductBySeller);


router.post('/new-order',tokenValidationMiddleware, createOrder);

module.exports = router;
