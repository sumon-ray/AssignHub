const jwt = require("jsonwebtoken")
const User = require("../models/User")

// Generate JWT
const generateToken = (id, email, role) => {
  // Added email and role parameters
  return jwt.sign({ id, email, role }, process.env.JWT_SECRET, {
    // Included them in payload
    expiresIn: "30d",
  })
}

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { email, password, role } = req.body

  if (!email || !password || !role) {
    return res.status(400).json({ message: "Please enter all fields" })
  }

  // Check if user exists
  const userExists = await User.findOne({ email })
  if (userExists) {
    return res.status(400).json({ message: "User already exists" })
  }

  // Create user
  const user = await User.create({
    email,
    password,
    role,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.email, user.role), // Pass email and role
    })
  } else {
    res.status(400).json({ message: "Invalid user data" })
  }
}

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.email, user.role), // Pass email and role
    })
  } else {
    res.status(401).json({ message: "Invalid email or password" })
  }
}

module.exports = { registerUser, loginUser }
