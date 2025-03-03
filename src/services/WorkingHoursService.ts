// src/services/WorkingHoursService.ts
import { WorkingHoursModel } from "../models/WorkingHoursModel";

export class WorkingHoursService {
  static async create(
    doctorId: number,
    dayOfWeek: string,
    startTime: string,
    endTime: string,
  ) {
    return await WorkingHoursModel.create(
      doctorId,
      dayOfWeek,
      startTime,
      endTime,
    );
  }

  static async getByDoctorId(doctorId: number) {
    return await WorkingHoursModel.getByDoctorId(doctorId);
  }

  static async update(id: number, startTime: string, endTime: string) {
    return await WorkingHoursModel.update(id, startTime, endTime);
  }

  static async delete(id: number) {
    await WorkingHoursModel.delete(id);
  }

  static async getAvailableHours(
    doctorId: number,
    dayOfWeek: string,
    date: string,
  ) {
    const workingHours = await WorkingHoursModel.getWorkingHours(
      doctorId,
      dayOfWeek,
    );
    if (!workingHours) return [];

    const appointments = await WorkingHoursModel.getAppointments(
      doctorId,
      date,
    );

    const startHour = parseInt(workingHours.start_time.split(":")[0]);
    const endHour = parseInt(workingHours.end_time.split(":")[0]);

    let availableHours: string[] = [];
    for (let hour = startHour; hour < endHour; hour++) {
      const timeSlot = `${hour}:00`;
      const isBooked = appointments.some(
        (appt) => parseInt(appt.start_time.split(":")[0]) === hour,
      );
      if (!isBooked) availableHours.push(timeSlot);
    }

    return availableHours;
  }
}
