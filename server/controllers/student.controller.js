import Parent from "../models/parent.model.js";
import User from "../models/user.model.js";
import Class from "../models/class.model.js";
import Student from "../models/student.model.js";
import bcrypt from "bcryptjs";
import ClassSubject from "../models/class.sub.model.js";

const generateAdmissionNumber = async () => {
  const count = await Student.countDocuments();
  return `ADM-${new Date().getFullYear()}-${count + 1}`;
};

export const createStudent = async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { userId, classId, parentId, address } = req.body;

 
    if (loggedInUser.role !== "ADMIN") {
      return res.status(403).json({ message: "Only admin can create student" });
    }


    if (!userId || !classId || !parentId) {
      return res.status(400).json({
        message: "userId, classId, parentId required",
      });
    }

    const user = await User.findById(userId);
    if (!user || user.role !== "STUDENT") {
      return res.status(400).json({ message: "Invalid student user" });
    }

  
    const parent = await Parent.findById(parentId);
    if (!parent) {
      return res.status(400).json({ message: "Parent not found" });
    }


    const studentExist = await Student.findOne({ userId });
    if (studentExist) {
      return res.status(409).json({ message: "Student already exists" });
    }

    const admissionNumber = await generateAdmissionNumber();

    const student = await Student.create({
      userId,
      classId,
      parentId,

      admissionNumber,

      address,
    });


    parent.children.push(student._id);
    await parent.save();

    return res.status(201).json(student);
  } catch (error) {

    return res
      .status(500)
      .json({ message: error?.message || "Internal server error" });
  }
};

export const adminCreateStudent = async (req, res) => {
  try {
    const { name, email, parentId, classId, password, address } = req.body;

    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Access Denied" });
    }

    if (!name || !email || !parentId || !classId || !password || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const parent = await Parent.findById(parentId);
    if (!parent) {
      return res.status(404).json({ message: "Invalid parent details" });
    }

    const classExist = await Class.findById(classId);
    if (!classExist) {
      return res.status(404).json({ message: "Invalid selected class" });
    }

    let user = await User.findOne({ email });

    if (user && user.role !== "STUDENT") {
      return res
        .status(400)
        .json({ message: "Email already exists but role is not STUDENT" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    if (!user) {
      user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: "STUDENT",
      });
    }

    const studentExist = await Student.findOne({ userId: user._id });
    if (studentExist) {
      return res.status(409).json({ message: "Student already exists" });
    }

    const admissionNumber = await generateAdmissionNumber();

    const student = await Student.create({
      userId: user._id,
      classId,
      parentId,
      admissionNumber,
      address,
    });

    parent.children.push(student._id);
    await parent.save();

    return res.status(201).json(student);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const searchStudentUser = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query?.trim()) {
      return res.status(400).json({ message: "Search query required" });
    }

    const q = query.trim();

    const student = await User.find({
      role: "STUDENT",
      $or: [
        { name: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
      ],
    }).select("name email phone role");

    if (!student || student.length === 0) {
      return res.status(404).json({ message: "Student user not found" });
    }

    return res.status(200).json(student);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Student.countDocuments();

    const students = await Student.find({})
      .populate("userId", "name email phone")
      .populate({
        path: "parentId",
        populate: { path: "userId", select: "name email phone" },
      })
      .populate("classId", "name section")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return res.status(200).json({
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      students,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await Student.findOne({ userId: studentId })
      .populate({
        path: "userId",
        select: "name email",
      })

      .populate({
        path: "classId",
        populate: {
          path: "classTeacher",
          select: "name email",
        },
      })
      .populate({
        path: "parentId",
        populate: {
          path: "userId",
          select: "name email",
        },
        select: "occupation",
      })
      .lean();

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    const subjectMappings = await ClassSubject.find({
      classId: student.classId._id,
    }).populate("subjectId", "name code");

    const subjects = subjectMappings.map((m) => m.subjectId);

    student.subjects = subjects;

    return res.status(200).json(student);
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const getStudentByClass = async (req, res) => {
  try {
    let { classId } = req.params;
    if (!classId) {
      return res.status(403).json({ message: "Please select class" });
    }
    let students = await Student.find({ classId })
      .populate("userId", "name email")
      .populate("parentId", "name")
      .populate("classId");

    if (!students) {
      return res.status(404).json({ message: "No student yet in this class" });
    }
    return res.status(200).json(students);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getStudentByEmail = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const student = await Student.findOne({ userId: user._id })
      .populate("userId")
      .populate("classId")
      .populate("parentId");

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    return res.status(200).json(student);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
export const studentById = async (req, res) => {
  try {
    let { studentId } = req.params;
    let student = await Student.findById(studentId)
      .populate("userId")
      .populate("classId")
      .populate("parentId");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.status(200).json(student);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
