import * as submissionController from "../controllers/submission.controller.js";
import { Router } from "express";
import { authUser, teacherOnly, studentOnly } from "../middleware/authMid.js";
const router = Router();

router.post(
  "/submit",
  authUser,
  studentOnly,
  submissionController.submitAssignment,
);
router.post(
  "/grade",
  authUser,
  teacherOnly,
  submissionController.gradeSubmission,
);

router.post(
  "/get-assignment-results",
  authUser,
  submissionController.getAssignmentResult,
);

router.post(
  "/get-student-submissions",
  authUser,
  submissionController.getStudentAssignments,
);
export default router;
