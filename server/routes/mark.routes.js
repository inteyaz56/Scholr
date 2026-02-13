import * as markController from "../controllers/mark.controller.js";
import { Router } from "express";
const router = Router();
import { authUser, teacherOnly, studentOnly } from "../middleware/authMid.js";

router.post("/create", authUser, teacherOnly, markController.enterMarks);
router.post("/get/result", authUser, markController.getMarksSheet);
router.post("/student/marks", authUser, markController.getStudentMarks);

export default router;
