import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Token not verified" });
    }
    const user = await User.findById(decoded.userId).select("_id role");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    req.userId = decoded.userId;
    next();
  } catch (error) {
   
    return res.status(500).json({ message: "Server Error" });
  }
};

export const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "ADMIN") {
    return res.status(403).json({
      message: "Access denied. Admin only.",
    });
  }
  next();
};

export const teacherOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "TEACHER") {
    return res.status(403).json({
      message: "Access denied. Teacher only.",
    });
  }
  next();
};

export const studentOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "STUDENT") {
    return res.status(403).json({
      message: "Access denied. Student only.",
    });
  }
  next();
};

export const parentOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "PARENT") {
    return res.status(403).json({
      message: "Access denied. Parent only.",
    });
  }
  next();
};

export const adminOrParent = (req, res, next) => {
  if (req.user.role === "ADMIN" || req.user.role === "PARENT") {
    return next();
  }
  return res.status(403).json({ message: "Access denied" });
};

export const adminOrTeacher = (req, res, next) => {
  if (req.user.role === "TEACHER" || req.user.role === "ADMIN") {
    return next();
  }
  return res.status(403).json({ message: "Access denied" });
};

export const adminOrStudentOrTeacher = (req, res, next) => {
  if (
    req.user.role === "STUDENT" ||
    req.user.role === "ADMIN" ||
    req.user.role === "TEACHER"
  ) {
    return next();
  }
  return res.status(403).json({ message: "Access denied" });
};
