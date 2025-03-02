import express from "express";
import Hospital from "../models/Hospital.js";  // ✅ Ensure Hospital model is imported
import { 
  createHospital, 
  getHospitalsByCity, 
  deleteHospital, 
  updateHospital, 
  addHospitalDetails 
} from "../controllers/hospitalController.js";

const router = express.Router();

// ✅ Get a hospital by ID
router.get("/:id", async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) return res.status(404).json({ error: "Hospital not found" });

    res.json(hospital);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.put("/update", async (req, res) => {
    const { id } = req.query;
    const updates = req.body;
  
    try {
      const hospital = await Hospital.findByIdAndUpdate(id, updates, { new: true });
      if (!hospital) return res.status(404).json({ error: "Hospital not found" });
  
      res.json(hospital);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
router.put("/update", async (req, res) => {
    const { id } = req.query;
    const updates = req.body;
  
    try {
      const hospital = await Hospital.findByIdAndUpdate(id, updates, { new: true });
      if (!hospital) return res.status(404).json({ error: "Hospital not found" });
  
      res.json(hospital);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// ✅ Create a new hospital
router.post("/create", createHospital);

// ✅ Get hospitals by city
router.get("/", getHospitalsByCity);

// ✅ Delete a hospital
router.delete("/delete", deleteHospital);

// ✅ Update a hospital
router.put("/update", updateHospital);

// ✅ Add/Update hospital details
router.post("/details", addHospitalDetails);

export default router;
