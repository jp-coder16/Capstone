const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET, JWT_EXPIRE } = require('../config/env');
const { successResponse, errorResponse } = require('../utils/apiResponse');

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return errorResponse(res, 'Email already registered', 400);

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role: role || 'user' });
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
    successResponse(res, { token, user: { id: user._id, name, email, role: user.role } }, 'Signup successful', 201);
  } catch (err) {
    errorResponse(res, err.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return errorResponse(res, 'Invalid credentials', 400);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return errorResponse(res, 'Invalid credentials', 400);

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
    successResponse(res, { token, user: { id: user._id, name: user.name, email, role: user.role } }, 'Login successful');
  } catch (err) {
    errorResponse(res, err.message);
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    successResponse(res, user, 'Profile fetched');
  } catch (err) {
    errorResponse(res, err.message);
  }
};