import { Router } from "express";
import { PaymentController } from "../controllers/PaymentController";
import { authMiddleware } from "../middleware/auth";
import { roleMiddleware } from "../middleware/roleMiddleware";

const router = Router();

router.get(
  "/",
  authMiddleware,
  PaymentController.getByPatient,
);
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["doctor", "admin"]),
  PaymentController.create,
);

export default router;
