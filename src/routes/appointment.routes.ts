import express from "express";
import AppointmentController from "../controllers/AppointmentController";
import { authMiddleware } from "../middleware/auth";
import { authLimiter } from "../utils/requestLimiter";

const router = express.Router();

router.post("/", authMiddleware, authLimiter, AppointmentController.create);
router.get("/", authMiddleware, authLimiter, AppointmentController.getAll);
router.get("/:id", authMiddleware, authLimiter, AppointmentController.getById);
router.put("/:id", authMiddleware, authLimiter, AppointmentController.update);
router.delete("/:id", authMiddleware, authLimiter, AppointmentController.delete);

export default router;
