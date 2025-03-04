import { Request, Response } from "express";
import PatientService from "../services/PatientService";
import { handleError } from "../utils/errorHandler";
import bcrypt from "bcrypt";
import { CreatePatientDto } from "../dtos/CreatePatientDto";

class PatientController {
  async create(req: Request, res: Response) {
    try {
      const createUserDto = new CreatePatientDto(req.body);

      const validationFields = createUserDto.validate();
      console.log("fields", validationFields);

      if (!validationFields.isValid) {
        const firstErrorMessage = Object.values(validationFields.errors)[0];
        throw new Error(firstErrorMessage);
      }
      const validationResult = createUserDto.validateRegistrationForm();
      console.log("result"), validationResult;

      if (!validationResult.isValid) {
        const firstErrorMessage = Object.values(validationResult.errors)[0];
        throw new Error(firstErrorMessage);
      } else {
        const hashedPassword = await bcrypt.hash(createUserDto.password!, 10);
        createUserDto.password = hashedPassword;
        const doctor = await PatientService.create(createUserDto);
        res.status(201).json({ success: true, data: doctor });
      }
    } catch (err) {
      handleError(res, err);
    }
  }

  async getAll(_req: Request, res: Response) {
    try {
      const patients = await PatientService.getAll();
      res.status(200).json({ success: true, data: patients });
    } catch (err) {
      handleError(res, err);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const patient = await PatientService.getById(Number(req.params.id));
      res.status(200).json({ success: true, data: patient });
    } catch (err) {
      handleError(res, err);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updatedPatient = await PatientService.update(
        Number(req.params.id),
        req.body,
      );
      res.status(200).json({ success: true, data: updatedPatient });
    } catch (err) {
      handleError(res, err);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const message = await PatientService.delete(Number(req.params.id));
      res.status(200).json({ success: true, message });
    } catch (err) {
      handleError(res, err);
    }
  }
}

export default new PatientController();
