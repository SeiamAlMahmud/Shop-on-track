const jwt = require('jsonwebtoken');
const { generateAccessToken } = require('../utils/jwt');
const customerModel = require('../models/customer.model');
const sellerModel = require('../models/seller.model');
const courierModel = require('../models/courier.model');

// Helper function

// Generate Access Token
// const generateAccessToken = (user, role) => {
//     return jwt.sign(
//         { userId: user._id, fullName: user.fullName, userType: role },
//         process.env.ACCESS_TOKEN_SECRET,
//         { expiresIn: '15m' } // 15 minutes
//     );
// };

// Generate Refresh Token
const generateRefreshToken = (user, role) => {
  return jwt.sign(
    { userId: user._id, fullName: user.fullName, userType: role },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' } // 7 days
  );
};

// Get Model Based on Role
const getModelBasedOnRole = (role) => {
  if (role === 'customer') return customerModel;
  if (role === 'seller') return sellerModel;
  if (role === 'courier') return courierModel;
  throw new Error('Invalid role');
};

const tokenValidationMiddleware = async (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;
  console.log(accessToken, "accessToken", refreshToken, "refreshToken");
  try {
    // Check if both tokens are present
    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized. Please log in again.',
      });
    }

    // Validate the refresh token
    const decodedRefreshToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    console.log(decodedRefreshToken, "decodedRefreshToken")
    const userModel = getModelBasedOnRole(decodedRefreshToken.userType);
    const user = await userModel.findById(decodedRefreshToken.userId);
    // console.log(user, 'user');

    if (!user || user.refreshToken !== refreshToken) {
      return res
        .status(403)
        .json({ message: 'Invalid refresh token. Please log in again.' });
    }

    // If the access token is present and valid, proceed
    if (accessToken) {
      try {
        const decodedAccessToken = jwt.verify(
          accessToken,
          process.env.ACCESS_TOKEN_SECRET
        );
        req.user = decodedAccessToken; // Attach user info to the request
        req.userId = decodedAccessToken.userId || decodedRefreshToken.userId;
        req.role = decodedAccessToken.userType || decodedRefreshToken.userType; // Attach user role to the request
        return next();
      } catch (err) {
        console.log(err, 'tokenValidationMiddleware');	
        // If access token is invalid, fall back to refresh token validation
        if (err.name !== 'TokenExpiredError') {
          return res.status(403).json({ message: 'Invalid access token.' });
        }
      }
    }

    // If access token is missing or expired, generate a new one
    const newAccessToken = generateAccessToken(user, decodedRefreshToken.role);
    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: true, // Ensure secure attribute is set to true
      sameSite: 'none',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    req.user = { userId: user._id, role: decodedRefreshToken.role, fullName: decodedRefreshToken.fullName || ""}; // Attach user info to the request
    req.userId = user._id;
    req.role = decodedRefreshToken.userType; // Attach user role to the request
    next();
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Token validation failed. Please log in again.',
      error: error,
      errorMSG: error.message,
    });
  }
};

module.exports = tokenValidationMiddleware;
