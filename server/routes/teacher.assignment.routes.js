import { Router } from "express";
const router = Router();
import * as teacherController from "../controllers/teacher.assigment.controller.js";
import { authUser, adminOnly, teacherOnly } from "../middleware/authMid.js";

router.post(
  "/assign/subject",
  authUser,
  adminOnly,
  teacherController.assignTeacherToClassSubject,
);
router.post(
  "/get-teacher-assignment",
  authUser,
  adminOnly,
  teacherController.getClassSubjectTeachers,
);

router.get(
  "/teacher/assignment",
  authUser,
  adminOnly,
  teacherController.getAllAssignments,
);

router.get(
  "/teacher-assignment/my-classes",
  authUser,
  teacherOnly,
  teacherController.myClasses,
);
export default router;
