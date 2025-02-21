import express from "express";
import PatientController from "../controllers/PatientController";
import { authMiddleware } from "../middleware/auth";
import { authLimiter } from "../utils/requestLimiter";

const router = express.Router();

router.post("/", authMiddleware, authLimiter, PatientController.create);
router.get("/", authMiddleware, authLimiter, PatientController.getAll);
router.get("/:id", authMiddleware, authLimiter, PatientController.getById);
router.put("/:id", authMiddleware, authLimiter, PatientController.update);
router.delete("/:id", authMiddleware, authLimiter, PatientController.delete);

export default router;
