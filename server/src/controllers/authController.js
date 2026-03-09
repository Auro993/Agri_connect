const bcrypt = require("bcryptjs");  
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// helper function to create token
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// REGISTER - UPDATED WITH LOCATION
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, location } = req.body; // Added location

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      location: location || null, // Added location
    });

    const token = generateToken(user);

    // remove password from response
    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      location: user.location, // Include location in response
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: safeUser,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// LOGIN - NO CHANGES
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      location: user.location, // Added location
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return res.status(200).json({
      message: "Login successful",
      token,
      user: safeUser,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
