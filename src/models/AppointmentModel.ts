import pool from "../config/db";
import { AppointmentDTO } from "../dtos/AppointmentDTO";

export class AppointmentModel {
  static async getByUser(userId: number, role: string) {
    const query =
      role === "doctor"
        ? "SELECT a.* FROM appointments a LEFT JOIN doctors p ON p.id = a.patient_id WHERE p.user_id = $1"
        : "SELECT a.* FROM appointments a LEFT JOIN patients p ON p.id = a.patient_id WHERE p.user_id = $1";
    const { rows } = await pool.query(query, [userId]);
    return rows;
  }

  static async create(data: AppointmentDTO) {
    const { rows } = await pool.query(
      `INSERT INTO appointments (patient_id, doctor_id, appointment_date, start_time, end_time) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [
        data.patientId,
        data.doctorId,
        data.appointmentDate,
        data.startTime,
        data.endTime,
      ],
    );
    return rows[0];
  }

  static async createByUser(data: AppointmentDTO) {
    const { rows } = await pool.query(
      `INSERT INTO appointments (patient_id, doctor_id, appointment_date, start_time, end_time) 
       VALUES ((SELECT id FROM patients WHERE user_id = $1 LIMIT 1), $2, $3, $4, $5) RETURNING *`,
      [
        data.patientId,
        data.doctorId,
        data.appointmentDate,
        data.startTime,
        data.endTime,
      ],
    );
    return rows[0];
  }

  static async getAll() {
    const result = await pool.query("SELECT * FROM appointments");
    return result.rows;
  }

  static async getById(id: number) {
    const result = await pool.query(
      "SELECT * FROM appointments WHERE id = $1",
      [id],
    );
    return result.rows[0];
  }

  // async update(id: number, appointment: any) {
  //   const query = `
  //     UPDATE appointments SET patient_id=$1, doctor_id=$2, date_time=$3, status=$4
  //     WHERE id=$5 RETURNING *`;
  //   const values = [
  //     appointment.patientId,
  //     appointment.doctorId,
  //     appointment.dateTime,
  //     appointment.status,
  //     id,
  //   ];
  //   const result = await pool.query(query, values);
  //   return result.rows[0];
  // }

  static async cancel(appointmentId: number) {
    const { rows } = await pool.query(
      "UPDATE appointments SET status = 'canceled' WHERE id = $1 RETURNING *",
      [appointmentId],
    );
    return rows[0];
  }

  static async delete(appointmentId: number) {
    await pool.query("DELETE FROM appointments WHERE id = $1", [appointmentId]);
    return { message: "Appointment deleted successfully" };
  }
}
