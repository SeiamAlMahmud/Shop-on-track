const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {
  registration,
  refreshAccessToken,
  login,
  logout,
  getProfile,
  getOrder,
} = require('../controllers/auth.controller');
const tokenValidationMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// Signup
router.post('/signup/:role', registration);
// SignIn
router.post('/login/:role', login);
// Sign Out
router.post('/logout', logout);
// router.post("/signup/:role", registration)
router.get('/refresh', refreshAccessToken);
router.get('/get-data', tokenValidationMiddleware, async (req, res) => {
  const userId = req.userId;
  const { refreshToken } = req.cookies;
  return res.status(200).json({ success: true, refreshToken, userId });
});

// get profile 
router.get('/getProfile/:role',tokenValidationMiddleware, getProfile);
router.post('/getOrder/:role',tokenValidationMiddleware, getOrder);


module.exports = router;
