// // server/Controllers/authController.js
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const User = require("../models/User");

// // Generate JWT Token
// const generateToken = (userId) => {
//   return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
// };

// // Register a new user
// const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Validate input
//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "Please fill in all fields" });
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email is already registered" });
//     }

//     // Hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create the user
//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     // Respond with token
//     const token = generateToken(user._id);
//     res.status(201).json({
//       message: "User registered successfully",
//       user: { id: user._id, name: user.name, email: user.email },
//       token,
//     });
//   } catch (error) {
//     console.error("Error in registerUser:", error); // Log the error
//     res.status(500).json({ message: "Server error. Please try again later." });
//   }
// };

// // Login user
// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Validate input
//     if (!email || !password) {
//       return res.status(400).json({ message: "Please fill in all fields" });
//     }

//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     // Respond with token
//     const token = generateToken(user._id);
//     res.status(200).json({
//       message: "User logged in successfully",
//       user: { id: user._id, name: user.name, email: user.email },
//       token,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // Get user profile (protected route)
// const getUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select("-password");
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json({
//       user,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// module.exports = {
//   registerUser,
//   loginUser,
//   getUserProfile,
// };


const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register a new user
const registerUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      console.log("RegisterUser Request Body:", req.body);
  
      if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
      }
  
      if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters." });
      }
  
      const normalizedEmail = email.toLowerCase();
      console.log("Normalized Email for Registration:", normalizedEmail);
  
      const existingUser = await User.findOne({ email: normalizedEmail });
      if (existingUser) {
        return res.status(400).json({ message: "Email is already registered." });
      }
  
      // Remove manual password hashing
      const user = await User.create({
        name,
        email: normalizedEmail,
        password, // Directly pass the raw password; it will be hashed by the pre('save') hook
      });
  
      console.log("User Created:", user);
  
      const token = generateToken(user._id);
      res.status(201).json({
        message: "User registered successfully.",
        user: { id: user._id, name: user.name, email: user.email },
        token,
      });
    } catch (error) {
      console.error("Error in registerUser:", error);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  };
  

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LoginUser Request Body:", req.body);

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const normalizedEmail = email.toLowerCase();
    console.log("Normalized Email for Login:", normalizedEmail);

    const user = await User.findOne({ email: normalizedEmail });
    console.log("User Found in DB:", user);

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    console.log("Input Password:", password);
    console.log("Stored Hashed Password:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match Result:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const token = generateToken(user._id);
    res.status(200).json({
      message: "User logged in successfully.",
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get user profile (protected route)
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("Error in getUserProfile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};
