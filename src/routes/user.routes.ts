import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middleware/auth";
import { authLimiter } from "../utils/requestLimiter";

const router = Router();

router.put(
  "/change-password",
  authMiddleware,
  authLimiter,
  UserController.changePassword,
);

export default router;
