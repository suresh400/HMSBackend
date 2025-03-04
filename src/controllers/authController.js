import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

// ✅ Get User Details (Authenticated)
export const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("Get User Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Register a New User (Admin/User)
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // ✅ Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists!" });
    }

    // ✅ Ensure only an existing admin can create another admin
    if (role === "admin") {
      const existingAdmins = await User.find({ role: "admin" });
      if (existingAdmins.length > 0) {
        return res.status(403).json({ error: "Only existing admins can create new admins" });
      }
    }

    // ✅ Hash the password properly before storing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log("Original Password:", password);
    console.log("Generated Hash:", hashedPassword);

    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(400).json({ error: "Failed to register user" });
  }
};

// ✅ Login User
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found!" });
    }

    console.log("Entered Password:", password);
    console.log("Stored Hash in DB:", user.password);

    // ✅ Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect password!" });
    }

    // ✅ Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
