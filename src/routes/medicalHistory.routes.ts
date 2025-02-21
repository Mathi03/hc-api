import express from "express";
import MedicalHistoryController from "../controllers/MedicalHistoryController";
import { authMiddleware } from "../middleware/auth";
import { authLimiter } from "../utils/requestLimiter";

const router = express.Router();

router.post("/", authMiddleware, authLimiter, MedicalHistoryController.create);
router.get("/", authMiddleware, authLimiter, MedicalHistoryController.getAll);
router.get("/:id", authMiddleware, authLimiter, MedicalHistoryController.getById);
router.put("/:id", authMiddleware, authLimiter, MedicalHistoryController.update);
router.delete("/:id", authMiddleware, authLimiter, MedicalHistoryController.delete);

export default router;
