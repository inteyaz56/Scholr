import * as userController from "../controllers/user.controller.js";
import { Router } from "express";
import { adminOnly, authUser } from "../middleware/authMid.js";
const router = Router();

router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.post("/logout", authUser, userController.logOutUser);
router.get("/get-user", authUser, userController.getCurrentUser);
router.get("/get-teacher", authUser, userController.getAllTeacher);
router.get("/student/search", authUser, adminOnly, userController.getUser);
export default router;
