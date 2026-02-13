import * as noticeController from "../controllers/notice.controller.js";
import { Router } from "express";
const router = Router();
import { authUser, adminOrTeacher } from "../middleware/authMid.js";

router.post("/create", authUser, adminOrTeacher, noticeController.createNotice);

router.get("/student", authUser, noticeController.getNoticesForStudent);

router.get("/my", authUser, adminOrTeacher, noticeController.getMyNotices);

router.delete("/:id", authUser, adminOrTeacher, noticeController.deleteNotice);
router.get("/view/:id", authUser, noticeController.noticeById);

export default router;
