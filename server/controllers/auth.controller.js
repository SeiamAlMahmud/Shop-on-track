const jwt = require('jsonwebtoken');
const courierModel = require('../models/courier.model');
const customerModel = require('../models/customer.model');
const sellerModel = require('../models/seller.model');
const bcrypt = require('bcrypt');
const {
  generateAccessToken,
  generateRefreshToken,
  validateRefreshToken,
} = require('../utils/jwt');

const registration = async (req, res) => {
  const { role } = req.params;
  const { email, password, ...otherData } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Email and password are required' });
  // console.log(role);
  try {
    let userModel;
    if (role === 'customer') userModel = customerModel;
    else if (role === 'seller') userModel = sellerModel;
    else if (role === 'courier') userModel = courierModel;
    else return res.status(400).json({ message: 'Invalid role' });

    const user = new userModel({ email, password, ...otherData });

    // Generate tokens
    const accessToken = generateAccessToken(user, role);
    const refreshToken = generateRefreshToken(user, role);

    // Save refresh token to the user's record
    user.refreshToken = refreshToken;

    await user.save();

    // Set both tokens in HTTP-only cookies
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true, // Ensure secure attribute is set to true
      sameSite: 'none',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true, // Ensure secure attribute is set to true
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      success: true,
      accessToken,
      refreshToken,
      message: 'User created successfully',
      userType: role,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { role } = req.params; // Role passed in the URL (customer, seller, courier)
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    let userModel;

    // Determine the appropriate model based on the role
    if (role === 'customer') userModel = customerModel;
    else if (role === 'seller') userModel = sellerModel;
    else if (role === 'courier') userModel = courierModel;
    else return res.status(400).json({ message: 'Invalid role' });

    // Find the user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user, role);
    const refreshToken = generateRefreshToken(user, role);

    // Save refresh token to the user's record
    user.refreshToken = refreshToken;
    await user.save();

    // Set both tokens in HTTP-only cookies
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true, // Ensure secure attribute is set to true
      sameSite: 'none',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true, // Ensure secure attribute is set to true
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res
      .status(200)
      .json({
        success: true,
        accessToken,
        refreshToken,
        message: 'Login successful',
        userType: role,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token missing' });
  }

  try {
    // Decode the refresh token to get user details
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const { userType } = decoded;
    console.log(decoded, "refreshToken")

    let userModel;

    // Determine the appropriate model based on the userType
    if (userType === 'customer') userModel = customerModel;
    else if (userType === 'seller') userModel = sellerModel;
    else if (userType === 'courier') userModel = courierModel;
    else return res.status(400).json({ message: 'Invalid user type' });

    // Invalidate the refresh token
    const user = await userModel.findOneAndUpdate(
      { refreshToken },
      { refreshToken: null }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Clear cookies
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    // Clear cookies if no refreshToken is found
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    return res.status(401).json({ message: 'Refresh token missing' });
  }

  try {
    // Validate the refresh token
    const decoded = await validateRefreshToken(refreshToken);
    if (!decoded) {
      // Clear cookies if the refresh token is invalid or expired
      res.clearCookie('accessToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });
      return res
        .status(403)
        .json({ message: 'Invalid or expired refresh token' });
    }

    // Generate a new access token
    const accessToken = generateAccessToken(decoded, decoded.userType);
        // Set both tokens in HTTP-only cookies
        res.cookie('accessToken', accessToken, {
          httpOnly: true,
          secure: true, // Ensure secure attribute is set to true
          sameSite: 'none',
          maxAge: 15 * 60 * 1000, // 15 minutes
        });

    res.status(200).json({
      success: true,
      message: 'Access token refreshed',
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};



const getProfile = async (req, res) => {
  const { role } = req.params;
  const userId = req.userId;
  console.log(userId, 'userId');
  try {
    let userModel;
    if (role === 'customer') userModel = customerModel;
    else if (role === 'seller') userModel = sellerModel;
    else if (role === 'courier') userModel = courierModel;
    else return res.status(400).json({ message: 'Invalid role' });

    let user = await userModel.findById(userId).select('-password -refreshToken');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.orderHistory && user.orderHistory.length > 0) {
      // Limit the number of orderHistory items
      const limitedOrderHistory = user.orderHistory.slice(0, 10); // Limit to 10 items

      user = await user.populate({
        path: 'orderHistory',
        match: { _id: { $in: limitedOrderHistory } }, // Match only the limited IDs
        populate: {
          path: 'productId sellerId courierId',
          select: '-password -refreshToken -email',
        },
      });
    } else {
      user.orderHistory = [];
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getOrder = async (req, res) => {
  const { role } = req.params;
  const userId = req.userId;
  const { page = 1, limit = 10 } = req.query; // Default values for page and limit

  console.log(userId, 'userId');
  try {
    let userModel;
    if (role === 'customer') userModel = customerModel;
    else if (role === 'seller') userModel = sellerModel;
    else if (role === 'courier') userModel = courierModel;
    else return res.status(400).json({ message: 'Invalid role' });

    // Fetch the user and select fields without mixing inclusion and exclusion
    let user = await userModel.findById(userId).select('orderHistory').lean();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const totalItems = user.orderHistory?.length || 0; // Total orders
    if (totalItems > 0) {
      // Calculate pagination details
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + parseInt(limit);

      // Paginate the orderHistory array
      const paginatedOrderHistory = user.orderHistory.slice(startIndex, endIndex);

      // Populate the paginated orderHistory
      user.orderHistory = await userModel.populate(
        { orderHistory: paginatedOrderHistory },
        {
          path: 'orderHistory',
          populate: {
            path: 'productId sellerId courierId',
            select: '-password -refreshToken -email', // Exclude sensitive fields
          },
        }
      );
      // Send paginated response with meta data
      res.status(200).json({
        orderHistory: user.orderHistory,
        meta: {
          currentPage: parseInt(page),
          totalItems, // Use the original length
          totalPages: Math.ceil(totalItems / limit),
        },
      });
    } else {
      res.status(200).json({
        orderHistory: [],
        meta: {
          currentPage: parseInt(page),
          totalItems: 0,
          totalPages: 0,
        },
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = { registration, login, logout, refreshAccessToken, getProfile, getOrder };
