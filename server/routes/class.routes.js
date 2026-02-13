import * as classController from "../controllers/class.controller.js";
import { Router } from "express";
import { authUser, adminOnly } from "../middleware/authMid.js";
const router = Router();

router.post("/create", authUser, adminOnly, classController.createClass);
router.get("/get-class", authUser, classController.getAllClasses);

export default router;
