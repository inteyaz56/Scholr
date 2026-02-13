import * as resultController from "../controllers/result.controller.js";
import { Router } from "express";
const router = Router();
import { authUser, adminOnly, adminOrTeacher } from "../middleware/authMid.js";

router.post(
  "/generate",
  authUser,
  adminOrTeacher,
  resultController.generateResult,
);
router.post("/get-result", authUser, resultController.getStudentResult);
router.post(
  "/bulk-result",
  authUser,
  adminOrTeacher,
  resultController.createBulkResults,
);

export default router;
