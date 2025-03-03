import { SpecialtyModel } from "../models/SpecialtyModel";

export class SpecialtyService {
  static async getAll() {
    return await SpecialtyModel.getAll();
  }

  static async getById(id: number) {
    return await SpecialtyModel.getById(id);
  }

  static async create(name: string, label: string, hourlyRate: number) {
    return await SpecialtyModel.create(name, label, hourlyRate);
  }

  static async update(id: number, name: string, label: string, hourlyRate: number) {
    return await SpecialtyModel.update(id, name, label, hourlyRate);
  }

  static async delete(id: number) {
    return await SpecialtyModel.delete(id);
  }
}
