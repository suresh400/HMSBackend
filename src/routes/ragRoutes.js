import express from "express";
import { getAnswer } from "../controllers/ragController.js";
import { authenticate } from "../middleware/authMiddleware.js"; // Ensure authentication

const router = express.Router();

router.post("/ask", authenticate, getAnswer); // Secure endpoint

export default router;
