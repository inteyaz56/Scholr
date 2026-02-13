import Parent from "../models/parent.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import Student from "../models/student.model.js";

export const createParent = async (req, res) => {
  try {
    let loggedInUserId = req.userId;
    const { occupation, address, parentUserId } = req.body;

  
    if (req.user.role !== "PARENT" && req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Invalid credentials" });
    }

    let userIdToCreateParentFor = loggedInUserId;

    if (req.user.role === "ADMIN") {
      if (!parentUserId) {
        return res.status(400).json({ message: "parentUserId is required" });
      }

      userIdToCreateParentFor = parentUserId;
    }

    
    const parentExist = await Parent.findOne({
      userId: userIdToCreateParentFor,
    });

    if (parentExist) {
      return res.status(409).json({ message: "Parent profile already exists" });
    }


    const parent = await Parent.create({
      userId: userIdToCreateParentFor,
      address,
      occupation,
    });

    return res.status(201).json(parent);
  } catch (error) {

    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createParentFromAdmin = async (req, res) => {
  try {
    const { name, email, password, occupation, address } = req.body;

    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Only admin can create parent" });
    }

    if (!email || !name) {
      return res.status(400).json({ message: "Name, email required" });
    }

    let user = await User.findOne({ email });

    if (user) {
      if (user.role !== "PARENT") {
        return res.status(400).json({
          message: "This email already exists but role is not PARENT",
        });
      }

      const parentExist = await Parent.findOne({ userId: user._id });

      if (parentExist) {
        return res
          .status(409)
          .json({ message: "Parent profile already exists" });
      }

      const parent = await Parent.create({
        userId: user._id,
        occupation,
        address,
      });

      return res.status(201).json(parent);
    }

    if (!password) {
      return res
        .status(400)
        .json({ message: "Password required for new parent" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "PARENT",
    });

    const parent = await Parent.create({
      userId: user._id,
      occupation,
      address,
    });

    return res.status(201).json(parent);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const searchParent = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query?.trim()) {
      return res.status(400).json({ message: "Search query required" });
    }

    const q = query.trim();

    const parents = await Parent.find()
      .populate({
        path: "userId",
        match: {
          role: "PARENT",
          $or: [
            { email: { $regex: q, $options: "i" } },
            { name: { $regex: q, $options: "i" } },
          ],
        },
        select: "name email  role",
      })
      .limit(10);

    const filteredParents = parents.filter((p) => p.userId);

    if (filteredParents.length === 0) {
      return res.status(404).json({ message: "Parent not found" });
    }

    return res.status(200).json(filteredParents[0]); // or return filteredParents
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getParent = async (req, res) => {
  try {
    let parent = await Parent.find({});
    if (!parent) {
      return res.status(404).json({ message: "No parent found" });
    }

    return res.status(200).json(parent);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error?.message || "Internal Server Error" });
  }
};

export const getMyChild = async (req, res) => {
  try {
    let userId = req.user._id;

    let parent = await Parent.findOne({ userId });
    let parentId = parent._id;

    let students = await Student.find({ parentId })
      .populate("userId")
      .populate("parentId")
      .populate("classId");
    return res.status(200).json(students);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export const updateParentDetails = async (req, res) => {
  try {
    let userId = req.user._id;
    let { name, occupation, address } = req.body;
    let parent = await Parent.findOne({ userId });

    if (!parent) {
      return res.status(404).json({ message: "Not found" });
    }
    let parentId = parent._id;

    await Parent.findByIdAndUpdate(
      parentId,
      { name, occupation, address },
      { new: true },
    );

    return res.status(200).josn({ message: "Details updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
