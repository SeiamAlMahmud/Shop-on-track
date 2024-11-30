const courierModel = require('../models/courier.model');
const customerModel = require('../models/customer.model');
const sellerModel = require('../models/seller.model');
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
  console.log(role);
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
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res
      .status(201)
      .json({
        success: true,
        token: accessToken,
        message: 'User created successfully',
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
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
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
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res
      .status(200)
      .json({ success: true, token: accessToken, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(400).json({ message: 'No token provided.' });
  }

  try {
    // Find user and clear the refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const userModel = getModelBasedOnRole(decoded.role);
    const user = await userModel.findById(decoded.userId);

    if (user) {
      user.refreshToken = null;
      await user.save();
    }

    // Clear cookies
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.status(200).json({ true: true, message: 'Logged out successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to log out.', error: error.message });
  }
};

const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token missing' });
  }

  try {
    // Validate the refresh token
    const decoded = await validateRefreshToken(refreshToken); // Example with `customerModel`
    if (!decoded) {
      return res
        .status(403)
        .json({ message: 'Invalid or expired refresh token' });
    }

    // Generate a new access token
    const accessToken = generateAccessToken(decoded, decoded.userType);

    res.status(200).json({
      success: true,
      message: 'Access token refreshed',
      accessToken,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registration, login, logout, refreshAccessToken };
