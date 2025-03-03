import mongoose from "mongoose";

const HospitalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, index: true },
    city: { type: String, required: true, index: true },
    imageUrl: { type: String, required: true },
    specialities: { type: [String], required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    description: { type: String, default: "No description available" },
    images: { type: [String], default: [] },
    numberOfDoctors: { type: Number, default: 0 },
    numberOfDepartments: { type: Number, default: 0 }
  },
  { timestamps: true } // Automatically add `createdAt` and `updatedAt`
);

export default mongoose.model("Hospital", HospitalSchema);
