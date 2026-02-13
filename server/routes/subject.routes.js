import { Router } from "express";
const router = Router();
import * as subjectController from "../controllers/subject.controller.js";
import { authUser, adminOnly } from "../middleware/authMid.js";

router.post("/create", authUser, adminOnly, subjectController.createSubject);
router.get(
  "/all/subject",
  authUser,
  adminOnly,
  subjectController.getAllSubject,
);
router.get(
  "/search",
  authUser,
  adminOnly,
  subjectController.getSubjectBySearch,
);

export default router;
