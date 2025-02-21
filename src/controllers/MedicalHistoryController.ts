import { Request, Response } from "express";
import MedicalHistoryService from "../services/MedicalHistoryService";
import { handleError } from "../utils/errorHandler";

class MedicalHistoryController {
  async create(req: Request, res: Response) {
    try {
      const medicalHistory = await MedicalHistoryService.create(req.body);
      res.status(201).json({ success: true, data: medicalHistory });
    } catch (err) {
      handleError(res, err);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const medicalHistoryRecords = await MedicalHistoryService.getAll();
      res.status(200).json({ success: true, data: medicalHistoryRecords });
    } catch (err) {
      handleError(res, err);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const medicalHistory = await MedicalHistoryService.getById(Number(req.params.id));
      res.status(200).json({ success: true, data: medicalHistory });
    } catch (err) {
      handleError(res, err);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updatedMedicalHistory = await MedicalHistoryService.update(Number(req.params.id), req.body);
      res.status(200).json({ success: true, data: updatedMedicalHistory });
    } catch (err) {
      handleError(res, err);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const message = await MedicalHistoryService.delete(Number(req.params.id));
      res.status(200).json({ success: true, message });
    } catch (err) {
      handleError(res, err);
    }
  }
}

export default new MedicalHistoryController();
