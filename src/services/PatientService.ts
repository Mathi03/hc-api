import PatientModel from "../models/PatientModel";
import { PatientDTO } from "../dtos/PatientDTO";

class PatientService {
  async create(patientData: any) {
    const patientDTO = new PatientDTO(patientData);
    const validation = patientDTO.validate();

    if (!validation.isValid) {
      throw new Error(validation.errors.join(", "));
    }

    return await PatientModel.create(patientDTO);
  }

  async getAll() {
    return await PatientModel.getAll();
  }

  async getById(id: number) {
    const patient = await PatientModel.getById(id);
    if (!patient) throw new Error("Patient not found");
    return patient;
  }

  async update(id: number, patientData: any) {
    return await PatientModel.update(id, patientData);
  }

  async delete(id: number) {
    return await PatientModel.delete(id);
  }
}

export default new PatientService();
