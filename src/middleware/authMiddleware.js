import jwt from "jsonwebtoken";

// Middleware to authenticate users
export const authenticate = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attach user details to request
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};

// Middleware to allow only Admins
export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).json({ error: "Forbidden: Admins only" });
  next();
};
