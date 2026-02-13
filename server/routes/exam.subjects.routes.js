import * as examController from "../controllers/exam.subject.controller.js";
import { Router } from "express";
const router = Router();
import { authUser, adminOnly } from "../middleware/authMid.js";

router.post(
  "/add-subject",
  authUser,
  adminOnly,
  examController.addSubjectToExam,
);
router.post("/get-subjects", authUser, examController.getSubjectsByExam);

export default router;
