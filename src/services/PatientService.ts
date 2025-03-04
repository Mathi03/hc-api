import PatientModel from "../models/PatientModel";
import { PatientDTO } from "../dtos/PatientDTO";
import { CreatePatientDto } from "../dtos/CreatePatientDto";

class PatientService {
  async create(patientData: CreatePatientDto) {
    const userId = await PatientModel.createUser(patientData);
    return await PatientModel.createPatient(patientData, userId);
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
