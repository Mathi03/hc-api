import express from "express";
import { SpecialtyController } from "../controllers/SpecialtyController";
import { authLimiter } from "../utils/requestLimiter";
import { authMiddleware } from "../middleware/auth";
import { roleMiddleware } from "../middleware/roleMiddleware";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  authLimiter,
  roleMiddleware(["doctor", "admin"]),
  SpecialtyController.getAll,
);
router.post(
  "/",
  authMiddleware,
  authLimiter,
  roleMiddleware(["admin"]),
  SpecialtyController.create,
);
router.put(
  "/:id",
  authMiddleware,
  authLimiter,
  roleMiddleware(["admin"]),
  SpecialtyController.update,
);
router.delete(
  "/:id",
  authMiddleware,
  authLimiter,
  roleMiddleware(["admin"]),
  SpecialtyController.delete,
);

export default router;
