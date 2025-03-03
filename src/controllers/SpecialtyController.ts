import { Request, Response } from "express";
import { SpecialtyService } from "../services/SpecialtyService";
import { handleError } from "../utils/errorHandler";

export class SpecialtyController {
  static async getAll(req: Request, res: Response) {
    try {
      const specialties = await SpecialtyService.getAll();
      res.status(200).json({ success: true, data: specialties });
    } catch (err) {
      handleError(res, err);
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const { name, label, hourlyRate } = req.body;
      const specialty = await SpecialtyService.create(name, label, hourlyRate);
      res.status(201).json({ success: true, data: specialty });
    } catch (err) {
      handleError(res, err);
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, label, hourlyRate } = req.body;
      const updated = await SpecialtyService.update(Number(id), name, label, hourlyRate);
      res.status(200).json({ success: true, data: updated });
    } catch (err) {
      handleError(res, err);
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const message = await SpecialtyService.delete(Number(id));
      res.status(204).json({ success: true, message });
    } catch (err) {
      handleError(res, err);
    }
  }
}
