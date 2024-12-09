const jwt = require('jsonwebtoken');
const customerModel = require('../models/customer.model');
const sellerModel = require('../models/seller.model');
const courierModel = require('../models/courier.model');
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY; // 15 minutes
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY; // 7 days

const getModelBasedOnRole = (role) => {
  if (role === 'customer') return customerModel;
  if (role === 'seller') return sellerModel;
  if (role === 'courier') return courierModel;
  throw new Error('Invalid role');
};

// Generate Access Token
function generateAccessToken(user, role) {
  return jwt.sign(
    { userId: user._id, fullName: user.fullName, userType: role }, // `userType` added to distinguish user type
    ACCESS_TOKEN_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRY }
  );
}

// Generate  Refresh Token
function generateRefreshToken(user, role) {
  return jwt.sign(
    { userId: user._id, fullName: user.fullName, userType: role }, // `userType` added for consistency with access token
    REFRESH_TOKEN_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRY }
  );
}

// Validate Access Token
function validateAccessToken(token) {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
  } catch (error) {
    return null;
  }
}

// Validate Refresh Token
async function validateRefreshToken(token) {
  try {
    // Verify the token's validity using the secret
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const userModel = getModelBasedOnRole(decoded.userType);
    // Check if the token exists in the user's record and hasn't expired
    const user = await userModel.findOne({
      _id: decoded.userId,
      refreshToken: token,
    });

    if (!user || new Date(user.refreshTokenExpiresAt) < new Date()) {
      return null; // Token is invalid or expired
    }

    return decoded; // Return the decoded token if valid
  } catch (error) {
    return null; // Handle any token verification or DB errors
  }
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  validateAccessToken,
  validateRefreshToken,
};
