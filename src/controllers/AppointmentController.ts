import { Request, Response } from "express";
import { handleError } from "../utils/errorHandler";
import { AppointmentService } from "../services/AppointmentService";
import { AppointmentDTO } from "../dtos/AppointmentDTO";

class AppointmentController {
  async getByUser(req: Request, res: Response) {
    try {
      const userId = req.currentUser!.id;
      const role = req.currentUser!.role;
      if (role === "admin") {
        const appointments = await AppointmentService.getAll();
        res.status(200).json({ success: true, data: appointments });
      } else {
        const appointments = await AppointmentService.getByUser(userId, role);
        res.status(200).json({ success: true, data: appointments });
      }
    } catch (err) {
      handleError(res, err);
    }
  }
  async create(req: Request, res: Response) {
    try {
      const appointmentDto = new AppointmentDTO(req.body);
      const validationResult = appointmentDto.validate();
      const role = req.currentUser!.role;

      if (!validationResult.isValid) {
        throw new Error(validationResult.errors[0]);
      }
      if (role === "patient") {
        const appointment = await AppointmentService.create(
          appointmentDto,
          true,
        );
        res.status(201).json({ success: true, data: appointment });
      } else {
        const appointment = await AppointmentService.create(
          appointmentDto,
          false,
        );
        res.status(201).json({ success: true, data: appointment });
      }
    } catch (err) {
      handleError(res, err);
    }
  }
  // async create(req: Request, res: Response) {
  //   try {
  //     const appointment = await AppointmentService.create(req.body);
  //     res.status(201).json({ success: true, data: appointment });
  //   } catch (err) {
  //     handleError(res, err);
  //   }
  // }

  async getAll(_req: Request, res: Response) {
    try {
      const appointments = await AppointmentService.getAll();
      res.status(200).json({ success: true, data: appointments });
    } catch (err) {
      handleError(res, err);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const appointment = await AppointmentService.getById(
        Number(req.params.id),
      );
      res.status(200).json({ success: true, data: appointment });
    } catch (err) {
      handleError(res, err);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const role = req.currentUser!.role;
      const updatedAppointment = await AppointmentService.update(
        Number(req.params.id),
        req.body,
        role,
      );
      res.status(200).json({ success: true, data: updatedAppointment });
    } catch (err) {
      handleError(res, err);
    }
  }

  async cancel(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const canceledAppointment = await AppointmentService.cancel(Number(id));
      res.status(200).json({ success: true, data: canceledAppointment });
    } catch (err) {
      handleError(res, err);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const message = await AppointmentService.delete(Number(id));
      res.status(200).json({ success: true, message });
    } catch (err) {
      handleError(res, err);
    }
  }
}

export default new AppointmentController();
