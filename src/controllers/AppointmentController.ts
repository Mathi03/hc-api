import { Request, Response } from "express";
import AppointmentService from "../services/AppointmentService";
import { handleError } from "../utils/errorHandler";

class AppointmentController {
  async create(req: Request, res: Response) {
    try {
      const appointment = await AppointmentService.create(req.body);
      res.status(201).json({ success: true, data: appointment });
    } catch (err) {
      handleError(res, err);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const appointments = await AppointmentService.getAll();
      res.status(200).json({ success: true, data: appointments });
    } catch (err) {
      handleError(res, err);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const appointment = await AppointmentService.getById(Number(req.params.id));
      res.status(200).json({ success: true, data: appointment });
    } catch (err) {
      handleError(res, err);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updatedAppointment = await AppointmentService.update(Number(req.params.id), req.body);
      res.status(200).json({ success: true, data: updatedAppointment });
    } catch (err) {
      handleError(res, err);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const message = await AppointmentService.delete(Number(req.params.id));
      res.status(200).json({ success: true, message });
    } catch (err) {
      handleError(res, err);
    }
  }
}

export default new AppointmentController();
