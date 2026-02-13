import Attendance from "../models/attendance.model.js";
import User from "../models/user.model.js";
import Class from "../models/class.model.js";
import Student from "../models/student.model.js";
import mongoose from "mongoose";

export const takeAttendance = async (req, res) => {
  try {
    let teacherId = req.user._id;
    const { classId, subjectId, date, records } = req.body;

    const teacher = await User.findById(teacherId);

    if (!teacher || teacher.role !== "TEACHER") {
      return res.status(403).json({ message: "Access Denied" });
    }

    if (!classId || !subjectId || !date) {
      return res.status(400).json({
        message: "classId, subjectId, date required",
      });
    }
    if (!records || records.length === 0) {
      return res.status(400).json({
        message: "records are required",
      });
    }

    const attendance = await Attendance.findOneAndUpdate(
      { teacherId, classId, subjectId, date },
      { teacherId, classId, subjectId, date, records },
      { new: true, upsert: true },
    );

    return res.status(200).json(attendance);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getStudentsByClass = async (req, res) => {
  try {
    const { classId } = req.body;

    if (!classId) {
      return res.status(400).json({ message: "classId is required" });
    }
    console.log("classId from body:", classId);

    const classExist = await Class.findById(classId);
    if (!classExist) {
      return res.status(404).json({ message: "Class not found" });
    }

    const students = await Student.find({ classId })
      .populate("userId", "name email")
      .select("userId classId rollNumber admissionNumber");

    console.log("DB:", Student.db.name);
    console.log("Collection:", Student.collection.name);
    console.log("Students found:", students);

    return res.status(200).json({
      success: true,
      students,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkAttendanceTaken = async (req, res) => {
  try {
    const teacherId = req.user._id;
    const { classId, subjectId, date } = req.body;

    if (!classId || !subjectId || !date) {
      return res.status(400).json({ message: "Missing params" });
    }

    const attendance = await Attendance.findOne({
      teacherId,
      classId,
      subjectId,
      date,
    });

    return res.status(200).json({
      taken: !!attendance,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const studentsStatusByClass = async (req, res) => {
  try {
    const teacherId = req.user._id;
    const { classId, date, subjectId } = req.body;

    if (!classId || !date) {
      return res.status(400).json({ message: "classId and date are required" });
    }

    const students = await Student.find({ classId })
      .populate("userId", "name")
      .select("_id userId rollNumber");

    const attendance = await Attendance.findOne({
      teacherId,
      classId,
      date,
    });

    const attendanceMap = {};
    if (attendance) {
      attendance.records.forEach((r) => {
        attendanceMap[r.studentId.toString()] = r.status;
      });
    }

    const result = students.map((student) => ({
      _id: student._id,
      name: student.userId?.name,
      rollNumber: student.rollNumber,
      status: attendance
        ? attendanceMap[student._id.toString()] || "NOT_MARKED"
        : "NOT_MARKED",
    }));

    return res.status(200).json({
      success: true,
      students: result,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAttendanceHistory = async (req, res) => {
  try {
    const teacherId = req.user._id;
    const { classId, subjectId } = req.body;

    if (!classId || !subjectId) {
      return res
        .status(400)
        .json({ message: "classId and subjectId are required" });
    }

    const today = new Date();
    const past30Days = new Date();
    past30Days.setDate(today.getDate() - 30);

    const history = await Attendance.find({
      teacherId,
      classId,
      subjectId,
      createdAt: { $gte: past30Days },
    })
      .sort({ date: -1 })
      .select("date records");

    const formatted = history.map((att) => {
      const present = att.records.filter((r) => r.status === "PRESENT").length;

      const absent = att.records.filter((r) => r.status === "ABSENT").length;

      return {
        _id: att._id,
        date: att.date,
        present,
        absent,
        total: att.records.length,
      };
    });

    return res.status(200).json({
      success: true,
      history: formatted,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAttendancePercentage = async (req, res) => {
  try {
    const teacherId = req.user._id;
    const { classId, subjectId } = req.body;

    if (!classId || !subjectId) {
      return res
        .status(400)
        .json({ message: "classId and subjectId are required" });
    }

    const students = await Student.find({ classId })
      .populate("userId", "name")
      .select("_id userId rollNumber");

    const attendanceList = await Attendance.find({
      teacherId,
      classId,
      subjectId,
    });

    const statsMap = {};

    attendanceList.forEach((att) => {
      att.records.forEach((rec) => {
        const sid = rec.studentId.toString();

        if (!statsMap[sid]) {
          statsMap[sid] = { present: 0, total: 0 };
        }

        statsMap[sid].total += 1;
        if (rec.status === "PRESENT") {
          statsMap[sid].present += 1;
        }
      });
    });

    const result = students.map((student) => {
      const data = statsMap[student._id.toString()] || {
        present: 0,
        total: 0,
      };

      const percentage =
        data.total === 0 ? 0 : Math.round((data.present / data.total) * 100);

      const absent = data.total - data.present;

      return {
        _id: student._id,
        name: student.userId?.name,
        rollNumber: student.rollNumber,
        present: data.present,
        absent,
        total: data.total,
        percentage,
      };
    });

    return res.status(200).json({
      success: true,
      students: result,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const adminClassAttendanceAnalytics = async (req, res) => {
  try {
    const { fromDate, toDate } = req.body;

    const dateFilter = {};
    if (fromDate && toDate) {
      dateFilter.date = { $gte: fromDate, $lte: toDate };
    }

    const attendanceList = await Attendance.find(dateFilter)
      .populate("classId", "name section")
      .populate("subjectId", "name");

    const analyticsMap = {};

    attendanceList.forEach((att) => {
      if (!att.classId || !att.subjectId) return;

      const key = `${att.classId._id}-${att.subjectId._id}`;

      if (!analyticsMap[key]) {
        analyticsMap[key] = {
          className: `${att.classId.name}-${att.classId.section}`,
          subjectName: att.subjectId.name,
          present: 0,
          total: 0,
        };
      }

      att.records.forEach((rec) => {
        analyticsMap[key].total += 1;
        if (rec.status === "PRESENT") {
          analyticsMap[key].present += 1;
        }
      });
    });

    const result = Object.values(analyticsMap).map((item) => ({
      ...item,
      percentage:
        item.total === 0 ? 0 : Math.round((item.present / item.total) * 100),
    }));

    return res.status(200).json({
      success: true,
      analytics: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAttendanceByStudent = async (req, res) => {
  try {
    const { studentId } = req.body;

    if (!studentId) {
      return res.status(400).json({
        message: "Student id is required",
      });
    }

    const attendance = await Attendance.find({
      "records.studentId": studentId,
    })
      .populate("classId")
      .populate("subjectId")
      .populate("teacherId")
      .lean();

    if (!attendance.length) {
      return res.status(404).json({
        message: "No attendance found",
      });
    }

    let present = 0;
    let total = 0;

    const history = [];

    attendance.forEach((day) => {
      const rec = day.records.find((r) => r.studentId.toString() === studentId);

      if (rec) {
        total++;
        if (rec.status === "PRESENT") present++;

        history.push({
          date: day.date,
          status: rec.status,
          classId: day.classId,
          subjectId: day.subjectId,
        });
      }
    });

    const percentage = total ? ((present / total) * 100).toFixed(1) : 0;

    return res.status(200).json({
      summary: {
        present,
        absent: total - present,
        total,
        percentage,
      },
      history,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getLast6MonthsAttendance = async (req, res) => {
  try {
    const { studentId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({
        message: "Invalid studentId",
      });
    }

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const data = await Attendance.aggregate([
      {
        $addFields: {
          dateObj: { $toDate: "$date" },
        },
      },

      {
        $match: {
          dateObj: { $gte: sixMonthsAgo },
          "records.studentId": new mongoose.Types.ObjectId(studentId),
        },
      },

      { $unwind: "$records" },

      {
        $match: {
          "records.studentId": new mongoose.Types.ObjectId(studentId),
        },
      },

      {
        $group: {
          _id: {
            year: { $year: "$dateObj" },
            month: { $month: "$dateObj" },
          },
          total: { $sum: 1 },
          present: {
            $sum: {
              $cond: [{ $eq: ["$records.status", "PRESENT"] }, 1, 0],
            },
          },
        },
      },

      {
        $project: {
          year: "$_id.year",
          month: "$_id.month",
          percentage: {
            $round: [
              {
                $multiply: [{ $divide: ["$present", "$total"] }, 100],
              },
              1,
            ],
          },
        },
      },

      { $sort: { year: 1, month: 1 } },
    ]);

    const months = [
      "",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const formatted = data.map((d) => ({
      month: months[d.month],
      year: d.year,
      percentage: d.percentage,
    }));

    return res.status(200).json(formatted);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};
