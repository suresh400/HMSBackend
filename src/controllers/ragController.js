import Hospital from "../models/Hospital.js"; // Import Hospital model

// Function to extract answers from the database manually
export const getAnswer = async (req, res) => {
  try {
    const { question } = req.body;

    // Search hospitals in the database
    const hospitals = await Hospital.find();

    // Convert the question to lowercase for better matching
    const lowerQuestion = question.toLowerCase();

    let responseText = "Sorry, I couldn't find relevant information.";

    hospitals.forEach((hospital) => {
      if (lowerQuestion.includes("location") || lowerQuestion.includes("city")) {
        responseText = `${hospital.name} is located in ${hospital.city}.`;
      } else if (lowerQuestion.includes("specializations") || lowerQuestion.includes("specialities")) {
        responseText = `${hospital.name} specializes in ${hospital.specialities.join(", ")}.`;
      } else if (lowerQuestion.includes("doctors") || lowerQuestion.includes("number of doctors")) {
        responseText = `${hospital.name} has ${hospital.numberOfDoctors || "an unknown number of"} doctors.`;
      } else if (lowerQuestion.includes("departments") || lowerQuestion.includes("number of departments")) {
        responseText = `${hospital.name} has ${hospital.numberOfDepartments || "an unknown number of"} departments.`;
      } else if (lowerQuestion.includes(hospital.name.toLowerCase())) {
        responseText = `Details of ${hospital.name}:\nLocation: ${hospital.city}\nSpecialities: ${hospital.specialities.join(", ")}\nDoctors: ${hospital.numberOfDoctors || "N/A"}\nDepartments: ${hospital.numberOfDepartments || "N/A"}`;
      }
    });

    res.json({ answer: responseText });

  } catch (error) {
    console.error("Error in RAG function:", error);
    res.status(500).json({ error: "Failed to fetch an answer." });
  }
};
