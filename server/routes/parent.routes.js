import {
  createParent,
  getParent,
  searchParent,
  createParentFromAdmin,
  getMyChild,
  updateParentDetails,
} from "../controllers/parent.controller.js";
import { Router } from "express";
const router = Router();
import {
  authUser,
  adminOrParent,
  adminOnly,
  parentOnly,
} from "../middleware/authMid.js";

router.post("/create/profile", authUser, adminOrParent, createParent);
router.post(
  "/admin/create/profile",
  authUser,
  adminOnly,
  createParentFromAdmin,
);
router.get("/search", authUser, adminOnly, searchParent);
router.get("/get-parent", authUser, adminOnly, getParent);
router.get("/get/child", authUser, parentOnly, getMyChild);
router.post("/update", authUser, parentOnly, updateParentDetails);
//router.get("/get-parnet" , authUser , adminOnly, getParent)
//router.get(`/parent/search?query=${query}`, authUser, searchParent);
export default router;
