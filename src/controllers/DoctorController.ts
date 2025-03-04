import { Request, Response } from "express";
import { handleError } from "../utils/errorHandler";
import { DoctorService } from "../services/DoctorService";
import bcrypt from "bcrypt";
import { CreateDoctorDto } from "../dtos/CreateDoctorDto";

export class DoctorController {
  static async getAll(req: Request, res: Response) {
    try {
      const specialtyId = req.query.specialtyId;
      const doctors = await DoctorService.getAll(Number(specialtyId));
      res.status(200).json({ success: true, data: doctors });
    } catch (err) {
      handleError(res, err);
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const doctor = await DoctorService.getById(Number(id));
      res.status(200).json({ success: true, data: doctor });
    } catch (err) {
      handleError(res, err);
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const createUserDto = new CreateDoctorDto(req.body);

      const validationResult = createUserDto.validateRegistrationForm();

      if (!validationResult.isValid) {
        throw new Error(validationResult.errors[0]);
      } else {
        const hashedPassword = await bcrypt.hash(createUserDto.password!, 10);
        createUserDto.password = hashedPassword;
        const doctor = await DoctorService.create(createUserDto);
        res.status(201).json({ success: true, data: doctor });
      }
    } catch (err) {
      handleError(res, err);
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, lastname, phone, email, specialtyId } = req.body;
      const updated = await DoctorService.update(
        Number(id),
        name,
        lastname,
        phone,
        email,
        specialtyId,
      );
      res.status(200).json({ success: true, data: updated });
    } catch (err) {
      handleError(res, err);
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const message = await DoctorService.delete(Number(id));
      res.status(200).json({ success: true, message });
    } catch (err) {
      handleError(res, err);
    }
  }
}
