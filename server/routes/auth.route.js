const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {
  registration,
  refreshAccessToken,
} = require('../controllers/auth.controller');
const tokenValidationMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// Signup
router.post('/signup/:role', registration);
// router.post("/signup/:role", registration)
router.post('/refresh', refreshAccessToken);
router.post('/get-data', tokenValidationMiddleware, async (req, res) => {
  const { refreshToken } = req.cookies;
  return res.status(200).json({ success: true, refreshToken });
});

module.exports = router;
