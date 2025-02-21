import { Request, Response } from "express";
import DoctorService from "../services/DoctorService";
import { handleError } from "../utils/errorHandler";

class DoctorController {
  async create(req: Request, res: Response) {
    try {
      const doctor = await DoctorService.create(req.body);
      res.status(201).json({ success: true, data: doctor });
    } catch (err) {
      handleError(res, err);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const doctors = await DoctorService.getAll();
      res.status(200).json({ success: true, data: doctors });
    } catch (err) {
      handleError(res, err);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const doctor = await DoctorService.getById(Number(req.params.id));
      res.status(200).json({ success: true, data: doctor });
    } catch (err) {
      handleError(res, err);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updatedDoctor = await DoctorService.update(Number(req.params.id), req.body);
      res.status(200).json({ success: true, data: updatedDoctor });
    } catch (err) {
      handleError(res, err);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const message = await DoctorService.delete(Number(req.params.id));
      res.status(200).json({ success: true, message });
    } catch (err) {
      handleError(res, err);
    }
  }
}

export default new DoctorController();
