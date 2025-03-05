import { Request, Response } from "express";
import { PaymentService } from "../services/PaymentService";
import { handleError } from "../utils/errorHandler";

export class PaymentController {
  static async getByPatient(req: Request, res: Response) {
    try {
      const patientId = req.currentUser!.id;
      const role = req.currentUser!.role;
      if (role === "admin") {
        const payments = await PaymentService.getAll();
        res.status(200).json({ success: true, data: payments });
      } else {
        const payments = await PaymentService.getByPatient(patientId);
        res.status(200).json({ success: true, data: payments });
      }
    } catch (err) {
      handleError(res, err);
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const { appointment_id, amount, payment_method } = req.body;
      const payment = await PaymentService.create(
        appointment_id,
        // patient_id,
        amount,
        payment_method,
      );
      res.status(200).json({ success: true, data: payment });
    } catch (err) {
      handleError(res, err);
    }
  }
}
