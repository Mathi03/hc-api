import express from "express";
import DoctorController from "../controllers/DoctorController";
import { authLimiter } from "../utils/requestLimiter";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

router.post("/", authMiddleware, authLimiter, DoctorController.create);
router.get("/", authMiddleware, authLimiter, DoctorController.getAll);
router.get("/:id", authMiddleware, authLimiter, DoctorController.getById);
router.put("/:id", authMiddleware, authLimiter, DoctorController.update);
router.delete("/:id", authMiddleware, authLimiter, DoctorController.delete);

export default router;
