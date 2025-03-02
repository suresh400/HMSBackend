import mongoose from "mongoose";

const HospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  imageUrl: { type: String, required: true },
  specialities: { type: [String], required: true },
  rating: { type: Number, required: true },
  description: { type: String },
  images: { type: [String] },
  numberOfDoctors: { type: Number },
  numberOfDepartments: { type: Number }
});

export default mongoose.model("Hospital", HospitalSchema);
