import AppointmentModel from "../models/AppointmentModel";
import { AppointmentDTO } from "../dtos/AppointmentDTO";

class AppointmentService {
  async create(appointmentData: any) {
    const appointmentDTO = new AppointmentDTO(appointmentData);
    const validation = appointmentDTO.validate();

    if (!validation.isValid) {
      throw new Error(validation.errors.join(", "));
    }

    return await AppointmentModel.create(appointmentDTO);
  }

  async getAll() {
    return await AppointmentModel.getAll();
  }

  async getById(id: number) {
    const appointment = await AppointmentModel.getById(id);
    if (!appointment) throw new Error("Appointment not found");
    return appointment;
  }

  async update(id: number, appointmentData: any) {
    return await AppointmentModel.update(id, appointmentData);
  }

  async delete(id: number) {
    return await AppointmentModel.delete(id);
  }
}

export default new AppointmentService();
