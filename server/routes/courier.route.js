const express = require('express');
const tokenValidationMiddleware = require('../middlewares/auth.middleware');
const {
  getCourierProfile,
  updateCourierProfile,
} = require('../controllers/courier.controllers');

const router = express.Router();

// router.post("/signup/:role", registration)

router.get(
  '/get-courier-porfile',
  tokenValidationMiddleware,
  getCourierProfile
);
router.put(
  '/update-courier-porfile',
  tokenValidationMiddleware,
  updateCourierProfile
);

module.exports = router;
