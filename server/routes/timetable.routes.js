import * as timeTableController from "../controllers/timetable.controller.js";
import { Router } from "express";
const router = Router();
import { authUser, adminOnly, adminOrTeacher } from "../middleware/authMid.js";

router.post(
  "/create",
  authUser,
  adminOnly,
  timeTableController.createTimetable,
);
router.get(
  "/all/timetables",
  authUser,
  adminOnly,
  timeTableController.getAllTimetables,
);
router.get(
  "/class/:classId",
  authUser,
  timeTableController.getTimetableByClass,
);
router.get(
  "/teacher/:teacherId",
  authUser,
  adminOrTeacher,
  timeTableController.getTimetableByTeacher,
);
router.get(
  "/student/:studentId",
  authUser,
  timeTableController.getTimetableByStudent,
);

router.delete(
  "/delete/:id",
  authUser,
  adminOnly,
  timeTableController.deleteTimetable,
);

export default router;
