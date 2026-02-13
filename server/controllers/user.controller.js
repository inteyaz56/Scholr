import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { genToken } from "../utils/genToken.js";
import Parent from "../models/parent.model.js";

export const createUser = async (req, res) => {
  try {
    let { name, email, role, password } = req.body;

    if (!name || !email || !role || !password) {
      return res.status(401).json({ message: "All fields are required" });
    }

    let userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(401).json({ message: "User already registerd" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let user = await User.create({
      name,
      email,
      role,
      password: hashedPassword,
    });

    if (role === "PARENT") {
      await Parent.create({
        userId: user._id,
        address: "",
        occupation: "",
      });
    }

    Parent;
    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error !" });
  }
};

export const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ message: "All fields are required" });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    let isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: error?.data?.response?.message | "Internal Server Error",
    });
  }
};

export const logOutUser = async (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logout Success" });
};

export const getCurrentUser = async (req, res) => {
  let userId = req.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  let user = await User.findById(userId).select("-password");
  if (!user) {
    return res.status(404).json({ message: "No user found" });
  }
  return res.status(200).json(user);
};

export const getAllTeacher = async (req, res) => {
  try {
    const teachers = await User.find({ role: "TEACHER" }).select("-password");
    return res.status(200).json(teachers);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getUser = async (req, res) => {
  try {
    let { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Enter email to search" });
    }

    let q = query.trim();

    let user = await User.findOne({ email: q }).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ message: "Student not found , create a new" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
