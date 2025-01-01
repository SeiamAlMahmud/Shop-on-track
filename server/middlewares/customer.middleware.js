const jwt = require('jsonwebtoken');

const customerOnlyMiddleware = (req, res, next) => {
  const { refreshToken } = req.cookies;

  // if (!accessToken) {
  //   return res.status(401).json({
  //     success: false,
  //     message: 'Unauthorized. Please log in as a customer.',
  //   });
  // }

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
  try {
    // const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    if (decodedRefreshToken.userType !== 'customer') {
      return res.status(403).json({
        success: false,
        message: 'Forbidden. Only customers are allowed to access this resource.',
        decodedRefreshToken,
      });
    }

    req.user = decodedRefreshToken; // Attach user info to the request
    req.userId = decodedRefreshToken.userId;
    req.role = decodedRefreshToken.userType; // Attach user role to the request
    next();
  } catch (error) {
    console.log(error)
    return res.status(403).json({
      success: false,
      message: 'Invalid token. Please log in again.',
      error: error.message,
    });
  }
};

module.exports = customerOnlyMiddleware;
