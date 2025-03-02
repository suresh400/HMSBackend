import express from "express";
import { register, login } from "../controllers/authController.js";
import { getUserDetails } from "../controllers/authController.js";
import { authenticate, isAdmin } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user", authenticate, getUserDetails, (req, res) => res.json(req.user));
export default router;
