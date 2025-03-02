import Hospital from "../models/Hospital.js";

// Create Hospital
export const createHospital = async (req, res) => {
  try {
    const hospital = new Hospital(req.body);
    await hospital.save();
    res.status(201).json(hospital);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Hospitals by City
export const getHospitalsByCity = async (req, res) => {
  try {
    const { city } = req.query;
    const hospitals = city ? await Hospital.find({ city }) : await Hospital.find();
    res.json(hospitals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Hospital
export const deleteHospital = async (req, res) => {
  try {
    const { id } = req.query;
    await Hospital.findByIdAndDelete(id);
    res.json({ message: "Hospital deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Hospital
export const updateHospital = async (req, res) => {
  try {
    const { id } = req.query;
    const hospital = await Hospital.findByIdAndUpdate(id, req.body, { new: true });
    res.json(hospital);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add or Update Hospital Details
export const addHospitalDetails = async (req, res) => {
    try {
      const { id } = req.query;
  
      // Check if hospital exists
      let hospital = await Hospital.findById(id);
      if (!hospital) return res.status(404).json({ error: "Hospital not found" });
  
      // Update hospital details dynamically
      const updatedFields = {};
      if (req.body.description) updatedFields.description = req.body.description;
      if (req.body.images) updatedFields.images = req.body.images;
      if (req.body.numberOfDoctors) updatedFields.numberOfDoctors = req.body.numberOfDoctors;
      if (req.body.numberOfDepartments) updatedFields.numberOfDepartments = req.body.numberOfDepartments;
  
      // Perform update
      const updatedHospital = await Hospital.findByIdAndUpdate(id, { $set: updatedFields }, { new: true });
  
      res.status(200).json({ message: "Hospital details updated successfully", hospital: updatedHospital });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  