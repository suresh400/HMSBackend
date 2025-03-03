import express from "express";
import { authenticate, authorize } from "../middleware/authMiddleware.js";
import {
  createHospital,
  getHospitalsByCity,
  deleteHospital,
  updateHospital,
  addHospitalDetails,
  getHospitalById,
} from "../controllers/hospitalController.js";

const router = express.Router();

// 🔹 Admin Only Routes (Require Authentication & Authorization)
router.post("/create", authenticate, authorize(["admin"]), createHospital);
router.put("/update", authenticate, authorize(["admin"]), updateHospital);
router.post("/details", authenticate, authorize(["admin"]), addHospitalDetails);
router.delete("/delete", authenticate, authorize(["admin"]), deleteHospital);

// 🔹 Public Routes (Require Only Authentication)
router.get("/", authenticate, getHospitalsByCity);
router.get("/:id", authenticate, getHospitalById);

export default router;
