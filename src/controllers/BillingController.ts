import { Request, Response } from "express";
import BillingService from "../services/BillingService";
import { handleError } from "../utils/errorHandler";

class BillingController {
  async create(req: Request, res: Response) {
    try {
      const billing = await BillingService.create(req.body);
      res.status(201).json({ success: true, data: billing });
    } catch (err) {
      handleError(res, err);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const billingRecords = await BillingService.getAll();
      res.status(200).json({ success: true, data: billingRecords });
    } catch (err) {
      handleError(res, err);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const billing = await BillingService.getById(Number(req.params.id));
      res.status(200).json({ success: true, data: billing });
    } catch (err) {
      handleError(res, err);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updatedBilling = await BillingService.update(Number(req.params.id), req.body);
      res.status(200).json({ success: true, data: updatedBilling });
    } catch (err) {
      handleError(res, err);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const message = await BillingService.delete(Number(req.params.id));
      res.status(200).json({ success: true, message });
    } catch (err) {
      handleError(res, err);
    }
  }
}

export default new BillingController();
