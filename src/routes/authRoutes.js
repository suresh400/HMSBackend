import express from "express";
import { register, login, getUserDetails } from "../controllers/authController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔹 Public Routes
router.post("/register", register);
router.post("/login", login);

// 🔹 Protected Routes (Requires Authentication)
router.get("/user", authenticate, getUserDetails);
router.get("/admin", authenticate, authorize(["admin"]), (req, res) => {
  res.json({ message: "Admin access granted" });
});

export default router;
