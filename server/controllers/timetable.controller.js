import Timetable from "../models/timetable.model.js";
import Student from "../models/student.model.js";
import Notification from "../models/notification.model.js";

export const createTimetable = async (req, res) => {
  try {
    const { teacherId, subjectId, classId, day, startTime, endTime } = req.body;

    if (
      !teacherId ||
      !subjectId ||
      !classId ||
      !day ||
      !startTime ||
      !endTime
    ) {
      return res.status(400).json({
        message: "All fields required",
      });
    }

    const classConflict = await Timetable.findOne({
      classId,
      day,
      startTime,
    });

    if (classConflict) {
      return res.status(400).json({
        message: "Class already has a period at this time",
      });
    }

    const teacherConflict = await Timetable.findOne({
      teacherId,
      day,
      startTime,
    });

    if (teacherConflict) {
      return res.status(400).json({
        message: "Teacher already busy at this time",
      });
    }

    const subjectConflict = await Timetable.findOne({
      classId,
      day,
      subjectId,
    });

    if (subjectConflict) {
      return res.status(400).json({
        message: "This subject already assigned for this class today",
      });
    }

    const timetable = await Timetable.create({
      teacherId,
      subjectId,
      classId,
      day,
      startTime,
      endTime,
    });

    const students = await Student.find({ classId });

    const notifications = students.map((stu) => ({
      userId: stu.userId,
      title: "Class schedule updated",
      message: `New timetable added for ${day}`,
      type: "TIMETABLE",
      link: `/timetable/view/${timetable._id}`,
    }));

    await Notification.insertMany(notifications);

    notifications.forEach((n) => {
      global.io.emit("newNotification", n);
    });

    return res.status(201).json(timetable);
  } catch (error) {
 
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getTimetableByClass = async (req, res) => {
  try {
    const { classId } = req.params;

    const data = await Timetable.find({ classId })
      .populate("subjectId")
      .populate("teacherId")

      .sort({ day: 1, startTime: 1 });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const getTimetableByTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;

    const data = await Timetable.find({ teacherId })
      .populate("subjectId", "name")
      .populate("classId", "name")
      .populate("teacherId")

      .sort({ day: 1, startTime: 1 });

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const getTimetableByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await Student.findById(studentId);

    const data = await Timetable.find({
      classId: student.classId,
    })
      .populate("subjectId", "name")
      .populate("teacherId")
      .sort({ day: 1, startTime: 1 });

    return res.status(200).json(data);
  } catch (err) {

    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteTimetable = async (req, res) => {
  try {
    const { id } = req.params;

    await Timetable.findByIdAndDelete(id);

    return res.status(200).json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllTimetables = async (req, res) => {
  try {
    const data = await Timetable.find()
      .populate("classId", "name")
      .populate("subjectId", "name")
      .populate("teacherId");

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
