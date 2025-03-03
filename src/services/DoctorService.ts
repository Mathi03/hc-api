// src/services/DoctorService.ts
import { CreateDoctorDto } from "../dtos/CreateDoctorDto";
import { DoctorModel } from "../models/DoctorModel";

export class DoctorService {
  static async getAll(withDetail: boolean) {
    return await DoctorModel.getAll(withDetail);
  }

  static async getById(id: number) {
    return await DoctorModel.getById(id);
  }

  static async create(doctorDTO: CreateDoctorDto) {
    const userId = await DoctorModel.createUser(doctorDTO);
    return await DoctorModel.createDoctor(doctorDTO, userId);
  }

  static async update(
    id: number,
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    specialtyId: number,
  ) {
    return await DoctorModel.update(
      id,
      firstName,
      lastName,
      phone,
      email,
      specialtyId,
    );
  }

  static async delete(id: number) {
    await DoctorModel.delete(id);
  }
}
