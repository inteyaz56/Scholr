import * as feeControlller from "../controllers/student.fees.controller.js";
import { createFeeStructure } from "../controllers/fee.structure.controller.js";
import { Router } from "express";
const router = Router();
import { adminOnly, authUser } from "../middleware/authMid.js";

router.post("/structure", authUser, adminOnly, createFeeStructure);
router.post("/assign/to-class", authUser, adminOnly, feeControlller.assignFess);
router.post("/pay", authUser, feeControlller.payFess);
router.post("/get", authUser, feeControlller.getStudentFee);
router.get("/get/summary", authUser, adminOnly, feeControlller.getFeeSummary);

export default router;
