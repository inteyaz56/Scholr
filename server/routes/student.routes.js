import {
  createStudent,
  adminCreateStudent,
  searchStudentUser,
  getStudentById,
  getAllStudents,
  getStudentByClass,
  getStudentByEmail,
  studentById,
} from "../controllers/student.controller.js";
import { Router } from "express";
import { authUser, adminOnly, studentOnly } from "../middleware/authMid.js";
const router = Router();

router.post("/create", authUser, adminOnly, createStudent);
router.post("/admin/create", authUser, adminOnly, adminCreateStudent);
router.get("/search-student", authUser, adminOnly, searchStudentUser);
router.get("/get-students", authUser, adminOnly, getAllStudents);
router.get("/get/student/:studentId", authUser, studentOnly, getStudentById);
router.get("/get/student/by-class/:classId", authUser, getStudentByClass);
router.get("/by-email", authUser, getStudentByEmail);
router.get("/byId/:studentId", authUser, studentById);
export default router;
