import Assignment from "../models/assignment.model.js";
import Student from "../models/student.model.js";

import Notification from "../models/notification.model.js";

export const createAssignment = async (req, res) => {
  try {
    const { title, description, classId, subjectId, dueDate } = req.body;

    const assignment = await Assignment.create({
      title,
      description,
      classId,
      subjectId,
      dueDate,
      teacherId: req.user._id,
    });

    const students = await Student.find({ classId });

    const notifications = students.map((stu) => ({
      userId: stu.userId,
      title: "New Assignment",
      message: `New assignment: ${title}`,
      type: "ASSIGNMENT",
      link: `/assignments/view/${assignment._id}`,
      isRead: false,
    }));

    await Notification.insertMany(notifications);

    global.io.emit("newNotification", {
      title: "New Assignment",
      message: `New assignment: ${title}`,
      link: `/assignments/view/${assignment._id}`,
    });

    return res.status(201).json({
      message: "Assignment created",
      assignment,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAssignmentsByClass = async (req, res) => {
  try {
    let { classId } = req.body;

    if (!classId) {
      return res.status(400).json({ message: "classId is required" });
    }

    let assignments = await Assignment.find({ classId })
      .populate("subjectId", "name")
      .populate("classId", "name")
      .populate("teacherId");

    if (!assignments) {
      return res.status(404).json({ message: "No assignments found" });
    }
    return res.status(200).json(assignments);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAssignmentByTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;

    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const total = await Assignment.countDocuments({ teacherId });

    const assignments = await Assignment.find({ teacherId })
      .populate("subjectId", "name")
      .populate("classId", "name")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return res.status(200).json({
      data: assignments,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalAssignments: total,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const viewAssignment = async (req, res) => {
  try {
    let { assignmentId } = req.params;
    let assignment = await Assignment.findById(assignmentId);
    return res.status(200).json(assignment);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
