import express from "express";
import PatientController from "../controllers/PatientController";
import { authMiddleware } from "../middleware/auth";
import { authLimiter } from "../utils/requestLimiter";
import { roleMiddleware } from "../middleware/roleMiddleware";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  authLimiter,
  roleMiddleware(["doctor", "admin"]),
  PatientController.create,
);
router.get(
  "/",
  authMiddleware,
  authLimiter,
  roleMiddleware(["doctor", "admin"]),
  PatientController.getAll,
);
router.get(
  "/:id",
  authMiddleware,
  authLimiter,
  roleMiddleware(["doctor", "admin"]),
  PatientController.getById,
);
router.put(
  "/:id",
  authMiddleware,
  authLimiter,
  roleMiddleware(["doctor", "admin"]),
  PatientController.update,
);
router.delete(
  "/:id",
  authMiddleware,
  authLimiter,
  roleMiddleware(["doctor", "admin"]),
  PatientController.delete,
);

export default router;
