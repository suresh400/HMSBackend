import jwt from "jsonwebtoken";
import User from "../models/User.js"; // ✅ Ensure correct import

// ✅ Authentication Middleware (Protect Routes)
export const authenticate = async (req, res, next) => {
  try {
    // ✅ Ensure Authorization header exists
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }

    // ✅ Extract actual token
    const token = authHeader.split(" ")[1];

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Fetch user from DB and attach to req
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ error: "Invalid token. User not found." });
    }

    next(); // Proceed to the next middleware
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Session expired. Please log in again." });
    }
    return res.status(403).json({ error: "Invalid token." });
  }
};

// ✅ Role-Based Authorization Middleware
export const authorize = (roles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized access." });
  }

  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: "Access denied. Insufficient permissions." });
  }

  next(); // Proceed to the next middleware
};
