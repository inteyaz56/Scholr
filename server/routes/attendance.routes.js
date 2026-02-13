import * as attendanceController from "../controllers/attendance.controller.js";
import { Router } from "express";
const router = Router();
import {
  authUser,
  teacherOnly,
  adminOrTeacher,
  adminOnly,
  adminOrStudentOrTeacher,
} from "../middleware/authMid.js";

router.post(
  "/create",
  authUser,
  teacherOnly,
  attendanceController.takeAttendance,
);
router.post(
  "/student/by-class",
  authUser,
  teacherOnly,
  attendanceController.getStudentsByClass,
);

router.post(
  "/check/attendance",
  authUser,
  teacherOnly,
  attendanceController.checkAttendanceTaken,
);
router.post(
  "/students/status",
  authUser,
  adminOrTeacher,
  attendanceController.studentsStatusByClass,
);

router.post(
  "/history",
  authUser,
  adminOrTeacher,
  attendanceController.getAttendanceHistory,
);

router.post(
  "/precentage",
  authUser,
  adminOrTeacher,
  attendanceController.getAttendancePercentage,
);

router.post(
  "/analytics",
  authUser,
  adminOnly,
  attendanceController.adminClassAttendanceAnalytics,
);

router.post(
  "/student/attendance",
  authUser,

  attendanceController.getAttendanceByStudent,
);

router.post(
  "/student/overall-attendance",
  authUser,
  adminOrStudentOrTeacher,
  attendanceController.getLast6MonthsAttendance,
);
export default router;
