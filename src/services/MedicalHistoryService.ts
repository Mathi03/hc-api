import MedicalHistoryModel from "../models/MedicalHistoryModel";
import { MedicalHistoryDTO } from "../dtos/MedicalHistoryDTO";

class MedicalHistoryService {
  async create(medicalHistoryData: any) {
    const medicalHistoryDTO = new MedicalHistoryDTO(medicalHistoryData);
    const validation = medicalHistoryDTO.validate();

    if (!validation.isValid) {
      throw new Error(validation.errors.join(", "));
    }

    return await MedicalHistoryModel.create(medicalHistoryDTO);
  }

  async getAll() {
    return await MedicalHistoryModel.getAll();
  }

  async getById(id: number) {
    const medicalHistory = await MedicalHistoryModel.getById(id);
    if (!medicalHistory) throw new Error("Medical history record not found");
    return medicalHistory;
  }

  async update(id: number, medicalHistoryData: any) {
    return await MedicalHistoryModel.update(id, medicalHistoryData);
  }

  async delete(id: number) {
    return await MedicalHistoryModel.delete(id);
  }
}

export default new MedicalHistoryService();
