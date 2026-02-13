import Exam from "../models/exam.model.js";
import Class from "../models/class.model.js";
import Student from "../models/student.model.js";
import Notification from "../models/notification.model.js";

export const createExam = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }

    const { name, classId, academicYear, startDate, endDate } = req.body;
    if (!name || !classId || !academicYear || !startDate || !endDate) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingExam = await Exam.findOne({
      name,
      classId,
      academicYear,
    });

    if (existingExam) {
      return res.status(400).json({ message: "Exam already exists" });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      return res.status(400).json({
        message: "Start date cannot be after end date",
      });
    }

    const classExists = await Class.findById(classId);
    if (!classExists) {
      return res.status(404).json({ message: "Class not found" });
    }

    const exam = await Exam.create({
      name: name.trim(),
      classId,
      academicYear,
      startDate: start,
      endDate: end,
      createdBy: req.user._id,
    });

    let students = await Student.find({ classId });

    const notifications = students.map((stu) => ({
      userId: stu.userId,
      title: "New Exam Scheduled",
      message: `${exam.name} exam scheduled`,
      type: "EXAM",
      link: `/exam/${exam._id}`,
    }));

    await Notification.insertMany(notifications);

    return res.status(201).json(exam);
  } catch (error) {
  
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getExams = async (req, res) => {
  try {
    const exams = await Exam.find().populate("classId", "name");
    return res.status(200).json(exams);
  } catch (error) {
  
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getExamByClass = async (req, res) => {
  try {
    let { classId } = req.body;
    if (!classId)
      return res.status(400).json({ message: "Class ID is required" });
    const exams = await Exam.find({ classId }).populate("classId", "name");
    if (exams.length === 0) {
      return res.status(404).json({ message: "No exams found for this class" });
    }
    return res.status(200).json(exams);
  } catch (error) {

    return res.status(500).json({ message: "Server Error" });
  }
};
