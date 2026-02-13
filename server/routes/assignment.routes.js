import * as assignmentController from "../controllers/assignmenr.controller.js";
import { Router } from "express";
import { authUser, teacherOnly } from "../middleware/authMid.js";
const router = Router();

router.post(
  "/create",
  authUser,
  teacherOnly,
  assignmentController.createAssignment,
);

router.post(
  "/getByClass",
  authUser,
  assignmentController.getAssignmentsByClass,
);
router.get(
  "/get/by-teacher/:teacherId",
  authUser,
  teacherOnly,
  assignmentController.getAssignmentByTeacher,
);
router.get(
  "/view/:assignmentId",
  authUser,
  assignmentController.viewAssignment,
);

export default router;
