import * as notificationController from "../controllers/notification.controller.js";
import { Router } from "express";
import { adminOnly, authUser, adminOrTeacher } from "../middleware/authMid.js";
const router = Router();

router.post(
  "/create",
  authUser,
  adminOrTeacher,
  notificationController.createNotification,
);

router.get("/my", authUser, notificationController.getMyNotificaion);
router.get("/read/:id", authUser, notificationController.markAsRead);
router.delete(
  "/delete/:id",
  authUser,
  notificationController.deleteNotification,
);
router.get("/unread-count", authUser, notificationController.getUnreadCount);
router.get("/all/read", authUser, notificationController.markAllAsRead);
export default router;
