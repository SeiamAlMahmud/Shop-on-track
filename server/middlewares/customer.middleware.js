const jwt = require('jsonwebtoken');

const customerOnlyMiddleware = (req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized. Please log in as a customer.',
    });
  }

  try {
    const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    if (decodedToken.userType !== 'customer') {
      return res.status(403).json({
        success: false,
        message: 'Forbidden. Only customers are allowed to access this resource.',
      });
    }

    req.user = decodedToken; // Attach user info to the request
    req.userId = decodedToken.userId;
    req.role = decodedToken.userType; // Attach user role to the request
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Invalid token. Please log in again.',
      error: error.message,
    });
  }
};

module.exports = customerOnlyMiddleware;
