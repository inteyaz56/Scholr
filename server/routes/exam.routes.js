import * as examController from "../controllers/exam.controller.js";
import { Router } from "express";
const router = Router();
import {
  authUser,
  adminOnly,
  adminOrStudentOrTeacher,
} from "../middleware/authMid.js";

router.post("/create", authUser, adminOnly, examController.createExam);
router.get(
  "/exams",
  authUser,
  adminOrStudentOrTeacher,
  examController.getExams,
);
router.post("/class", authUser, examController.getExamByClass);

export default router;
