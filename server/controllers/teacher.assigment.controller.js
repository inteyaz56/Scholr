import TeacherAssignment from "../models/teacher.assignment.model.js";
import User from "../models/user.model.js";
import Subject from "../models/subject.model.js";
import ClassSubject from "../models/class.sub.model.js";
import Class from "../models/class.model.js";

export const assignTeacherToClassSubject = async (req, res) => {
  try {
    if (req.user?.role !== "ADMIN") {
      return res.status(403).json({ message: "Access Denied" });
    }

    const { teacherId, classId, subjectId } = req.body;

    if (!teacherId || !classId || !subjectId) {
      return res.status(400).json({
        message: "teacherId, classId, subjectId required",
      });
    }

    const teacher = await User.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    if (teacher.role !== "TEACHER") {
      return res.status(400).json({ message: "User is not a teacher" });
    }

    const classExist = await Class.findById(classId);

    if (!classExist) {
      return res.status(404).json({ message: "Class not found" });
    }

    const subjectExist = await Subject.findById(subjectId);

    if (!subjectExist) {
      return res.status(404).json({ message: "Subject not found" });
    }

    const isSubjectAssignedToClass = await ClassSubject.findOne({
      classId,
      subjectId,
    });

    if (!isSubjectAssignedToClass) {
      return res.status(400).json({
        message: "This subject is not assigned to this class",
      });
    }

    const alreadyAssigned = await TeacherAssignment.findOne({
      teacherId,
      classId,
      subjectId,
    });

    if (alreadyAssigned) {
      return res.status(409).json({ message: "Already assigned" });
    }

    const assignment = await TeacherAssignment.create({
      teacherId,
      classId,
      subjectId,
    });

    return res.status(201).json(assignment);
  } catch (error) {

    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getClassSubjectTeachers = async (req, res) => {
  try {
    const { classId } = req.body;

    if (req.user?.role !== "ADMIN" || req.user?.role !== "TEACHER") {
      return res.status(403).json({ message: "Access denied" });
    }

    if (!classId) {
      return res.status(400).json({ message: "classId is required" });
    }

    const assignments = await ClassSubject.find({ classId })
      .populate("classId", "name section")
      .populate("subjectId", "name code")
      .populate("teacherId", "name email phone");

    return res.status(200).json(assignments);
  } catch (error) {
    
    return res.status(500).json({ message: "Server error" });
  }
};

export const getAllAssignments = async (req, res) => {
  try {
    const assignments = await TeacherAssignment.find()
      .populate("teacherId", "name email")
      .populate("classId", "name")
      .populate("subjectId", "name");

    return res.status(200).json({
      success: true,
      assignments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const myClasses = async (req, res) => {
  try {
    let teacherId = req.user._id;
    let teacher = await User.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    if (teacher.role !== "TEACHER") {
      return res.status(400).json({ message: "Access Denied" });
    }
    const assignments = await TeacherAssignment.find({ teacherId })
      .populate("classId", "name")
      .populate("subjectId", "name");

    if (!assignments) {
      return res.status(404).json("No assignments found");
    }

    return res.status(200).json(assignments);
  } catch (error) {
   
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
