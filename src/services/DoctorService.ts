// src/services/DoctorService.ts
import { CreateDoctorDto } from "../dtos/CreateDoctorDto";
import { DoctorModel } from "../models/DoctorModel";

export class DoctorService {
  static async getAll(specialtyId: number) {
    return await DoctorModel.getAll(specialtyId);
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
    name: string,
    lastName: string,
    phone: string,
    email: string,
    specialtyId: number,
  ) {
    return await DoctorModel.update(
      id,
      name,
      lastName,
      phone,
      email,
      specialtyId,
    );
  }

  static async delete(id: number) {
    return await DoctorModel.delete(id);
  }
}
