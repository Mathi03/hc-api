import { AppointmentDTO } from "../dtos/AppointmentDTO";
import { AppointmentModel } from "../models/AppointmentModel";

export class AppointmentService {
  static async create(appointmentData: any) {
    const appointmentDTO = new AppointmentDTO(appointmentData);
    const validation = appointmentDTO.validate();

    if (!validation.isValid) {
      throw new Error(validation.errors.join(", "));
    }

    return await AppointmentModel.create(appointmentDTO);
  }

  static async getAll() {
    return await AppointmentModel.getAll();
  }

  static async getById(id: number) {
    const appointment = await AppointmentModel.getById(id);
    if (!appointment) throw new Error("Appointment not found");
    return appointment;
  }

  static async getByUser(userId: number, role: string) {
    return await AppointmentModel.getByUser(userId, role);
  }

  // async update(id: number, appointmentData: any) {
  //   return await AppointmentModel.update(id, appointmentData);
  // }

  static async cancel(appointmentId: number) {
    return await AppointmentModel.cancel(appointmentId);
  }

  static async delete(appointmentId: number) {
    await AppointmentModel.delete(appointmentId);
  }
}
