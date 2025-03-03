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
    res.status(500).json({ error: error.message });
  }
};

// ✅ Register a New User (Admin/User)
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // ✅ Ensure only an existing admin can create another admin
    if (role === "admin") {
      const existingAdmins = await User.find({ role: "admin" });
      if (existingAdmins.length > 0) {
        return res.status(403).json({ error: "Only existing admins can create new admins" });
      }
    }

    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
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

    // ✅ Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect password!" });
    }

    // ✅ Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ user, token }); // ✅ Send correct response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
