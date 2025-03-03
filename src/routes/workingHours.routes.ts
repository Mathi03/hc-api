import { Router } from "express";
import { WorkingHoursController } from "../controllers/WorkingHoursController";
import { authMiddleware } from "../middleware/auth";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { authLimiter } from "../utils/requestLimiter";

const router = Router();

router.post(
  "/",
  authMiddleware,
  authLimiter,
  // roleMiddleware(["admin"]),
  WorkingHoursController.create,
);
router.get(
  "/:doctorId",
  authMiddleware,
  authLimiter,
  // roleMiddleware(["admin"]),
  WorkingHoursController.getByDoctorId,
);
router.put(
  "/:id",
  authMiddleware,
  authLimiter,
  // roleMiddleware(["admin"]),
  WorkingHoursController.update,
);
router.delete(
  "/:id",
  authMiddleware,
  authLimiter,
  // roleMiddleware(["admin"]),
  WorkingHoursController.delete,
);

router.get(
  "/",
  authMiddleware,
  authLimiter,
  roleMiddleware(["admin", "patient"]),
  WorkingHoursController.getAvailableHours,
);

export default router;
