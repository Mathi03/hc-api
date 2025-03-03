import { Request, Response } from "express";
import { WorkingHoursService } from "../services/WorkingHoursService";
import { handleError } from "../utils/errorHandler";

export class WorkingHoursController {
  static async create(req: Request, res: Response) {
    try {
      const { doctorId, dayOfWeek, startTime, endTime } = req.body;
      const workingHours = await WorkingHoursService.create(
        doctorId,
        dayOfWeek,
        startTime,
        endTime,
      );
      res.status(201).json({ success: true, data: workingHours });
    } catch (err) {
      handleError(res, err);
    }
  }

  static async getByDoctorId(req: Request, res: Response) {
    try {
      const { doctorId } = req.params;
      const workingHours = await WorkingHoursService.getByDoctorId(
        Number(doctorId),
      );
      res.status(200).json({ success: true, data: workingHours });
    } catch (err) {
      handleError(res, err);
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { startTime, endTime } = req.body;
      const updated = await WorkingHoursService.update(
        Number(id),
        startTime,
        endTime,
      );
      res.status(200).json({ success: true, data: updated });
    } catch (err) {
      handleError(res, err);
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const message = await WorkingHoursService.delete(Number(id));
      res.status(204).json({ success: true, message });
    } catch (err) {
      handleError(res, err);
    }
  }

  static async getAvailableHours(req: Request, res: Response): Promise<any> {
    try {
      const { doctorId, dayOfWeek, date } = req.query;
      console.log("Controller", req.query);

      if (!doctorId || !dayOfWeek || !date) {
        throw new Error("doctorId, dayOfWeek, and date are required");
      }

      const availableHours = await WorkingHoursService.getAvailableHours(
        Number(doctorId),
        String(dayOfWeek),
        String(date),
      );
      res.status(200).json({ success: true, data: availableHours });
    } catch (err) {
      handleError(res, err);
    }
  }
}
