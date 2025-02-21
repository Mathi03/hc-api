import DoctorModel from "../models/DoctorModel";
import { DoctorDTO } from "../dtos/DoctorDTO";

class DoctorService {
  async create(doctorData: any) {
    const doctorDTO = new DoctorDTO(doctorData);
    const validation = doctorDTO.validate();

    if (!validation.isValid) {
      throw new Error(validation.errors.join(", "));
    }

    return await DoctorModel.create(doctorDTO);
  }

  async getAll() {
    return await DoctorModel.getAll();
  }

  async getById(id: number) {
    const doctor = await DoctorModel.getById(id);
    if (!doctor) throw new Error("Doctor not found");
    return doctor;
  }

  async update(id: number, doctorData: any) {
    return await DoctorModel.update(id, doctorData);
  }

  async delete(id: number) {
    return await DoctorModel.delete(id);
  }
}

export default new DoctorService();
