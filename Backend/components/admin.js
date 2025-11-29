import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // your User model

const router = express.Router();

// Use a secret for admin token (keep it in env in production)
const ADMIN_SECRET = "adminsecret123";

// ----------------------
// Middleware to verify admin token
// ----------------------
const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(403).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1]; // Bearer <token>
  try {
    const decoded = jwt.verify(token, ADMIN_SECRET);
    // check if role/admin key exists
    if (!decoded.isAdmin) {
      return res.status(403).json({ message: "Access denied. Invalid admin token." });
    }
    req.admin = decoded; // optional
    next();
  } catch (err) {
    return res.status(403).json({ message: "Access denied. Invalid admin token." });
  }
};


// ----------------------
// Admin Login Route
// ----------------------
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Replace with your real admin credentials or DB check
  if (email === "hhlgroup@gmail.com" && password === "admin123") {
    const token = jwt.sign({ isAdmin: true }, ADMIN_SECRET, { expiresIn: "1h" });
    return res.json({ token });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});

// ----------------------
// Get all users (protected)
// ----------------------
router.get("/users", verifyAdmin, async (req, res) => {
  try {
    const users = await User.find(); // get all users from DB
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------------
// Delete a user
// ----------------------
router.delete("/users/:id", verifyAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------------
// Update a user
// ----------------------
router.put("/users/:id", verifyAdmin, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
