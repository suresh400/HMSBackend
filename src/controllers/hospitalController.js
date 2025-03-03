import Hospital from "../models/Hospital.js";

// ✅ Create a hospital (Admin Only)
export const createHospital = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    const { name, city, imageUrl, specialities, rating } = req.body;

    if (!name || !city || !imageUrl || !rating) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const hospital = new Hospital(req.body);
    await hospital.save();
    res.status(201).json(hospital);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get hospitals by city
export const getHospitalsByCity = async (req, res) => {
  try {
    const { city } = req.query;
    const hospitals = city ? await Hospital.find({ city }) : await Hospital.find();
    res.json(hospitals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get a hospital by ID
export const getHospitalById = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) return res.status(404).json({ error: "Hospital not found" });

    res.json(hospital);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update hospital details (Admin Only)
export const updateHospital = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    const { id } = req.query;
    const updates = req.body;
    const hospital = await Hospital.findByIdAndUpdate(id, updates, { new: true });

    if (!hospital) return res.status(404).json({ error: "Hospital not found" });

    res.json(hospital);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Add hospital details (Admin Only)
export const addHospitalDetails = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    const { id } = req.query;
    const hospital = await Hospital.findById(id);
    if (!hospital) return res.status(404).json({ error: "Hospital not found" });

    Object.assign(hospital, req.body);
    await hospital.save();
    res.json(hospital);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete a hospital (Admin Only)
export const deleteHospital = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    const { id } = req.query;
    const hospital = await Hospital.findByIdAndDelete(id);
    if (!hospital) return res.status(404).json({ error: "Hospital not found" });

    res.json({ message: "Hospital deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
