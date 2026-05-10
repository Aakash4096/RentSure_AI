const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("../config/env");

// Helper: Generate JWT token
const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, config.jwtSecret, {
    expiresIn: config.jwtExpire,
  });
};

// POST /api/v1/auth/register
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create user (password gets hashed automatically by User model)
    const user = await User.create({ name, email, password });

    // Generate token and respond
    const token = generateToken(user._id, user.role);

    res.status(201).json({
      message: "Registration successful",
      token,
      user: user.toJSON(),
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
};
// POST /api/v1/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user and INCLUDE password field (it's hidden by default)
    const user = await User.findOne({ email }).select("+password");

    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = generateToken(user._id, user.role);

    res.json({
      message: "Login successful",
      token,
      user: user.toJSON(),
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};
module.exports = { register, login };
