import express from "express";
import BillingController from "../controllers/BillingController";
import { authMiddleware } from "../middleware/auth";
import { authLimiter } from "../utils/requestLimiter";

const router = express.Router();

router.post("/", authMiddleware, authLimiter, BillingController.create);
router.get("/", authMiddleware, authLimiter, BillingController.getAll);
router.get("/:id", authMiddleware, authLimiter, BillingController.getById);
router.put("/:id", authMiddleware, authLimiter, BillingController.update);
router.delete("/:id", authMiddleware, authLimiter, BillingController.delete);

export default router;
