import * as classSubController from "../controllers/class.sub.controller.js";
import { Router } from "express";
import { authUser, adminOnly } from "../middleware/authMid.js";
const router = Router();

router.post(
  "/create",
  authUser,
  adminOnly,
  classSubController.createClassSubject,
);

router.post("/get/subject", authUser,  classSubController.getClassSubject);

export default router;
