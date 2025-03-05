import { AppointmentDTO } from "../dtos/AppointmentDTO";
import { AppointmentModel } from "../models/AppointmentModel";

export class AppointmentService {
  static async create(appointmentData: any, isPatient: boolean) {
    const appointmentDTO = new AppointmentDTO(appointmentData);
    const validation = appointmentDTO.validate();

    if (!validation.isValid) {
      throw new Error(validation.errors.join(", "));
    }

    if (isPatient) {
      return await AppointmentModel.createByUser(appointmentDTO);
    } else {
      return await AppointmentModel.create(appointmentDTO);
    }
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

  static async update(id: number, appointmentData: any, role: string) {
    return await AppointmentModel.update(id, appointmentData, role);
  }

  static async cancel(appointmentId: number) {
    return await AppointmentModel.cancel(appointmentId);
  }

  static async delete(appointmentId: number) {
    return await AppointmentModel.delete(appointmentId);
  }
}
