import { Router } from "express";
import { DoctorController } from "../controllers/DoctorController";
import { authMiddleware } from "../middleware/auth";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { authLimiter } from "../utils/requestLimiter";

const router = Router();

router.get(
  "/",
  authMiddleware,
  authLimiter,
  roleMiddleware(["patient", "admin"]),
  DoctorController.getAll,
);
router.get(
  "/:id",
  authMiddleware,
  authLimiter,
  roleMiddleware(["admin"]),
  DoctorController.getById,
);
router.post(
  "/",
  authMiddleware,
  authLimiter,
  roleMiddleware(["admin"]),
  DoctorController.create,
);
router.put(
  "/:id",
  authMiddleware,
  authLimiter,
  roleMiddleware(["admin"]),
  DoctorController.update,
);
router.delete(
  "/:id",
  authMiddleware,
  authLimiter,
  roleMiddleware(["admin"]),
  DoctorController.delete,
);

export default router;
