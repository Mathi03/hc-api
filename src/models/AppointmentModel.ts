import pool from "../config/db";
import { AppointmentDTO } from "../dtos/AppointmentDTO";

export class AppointmentModel {
  static async getByUser(userId: number, role: string) {
    const query =
      role === "doctor"
        ? "SELECT a.*, p.name AS patient_name, p.lastname AS patient_lastname, CONCAT(p.name || ' ' ||p.lastname) AS patient_fullname, d.name AS doctor_name, d.lastname AS doctor_lastname, CONCAT(d.name || ' ' ||d.lastname) AS doctor_fullname, ROUND(s.hourly_rate * (EXTRACT(EPOCH FROM (a.end_time - a.start_time)) / 3600), 2) AS appointment_price FROM appointments a LEFT JOIN patients p ON p.id = a.patient_id LEFT JOIN doctors d ON d.id = a.doctor_id LEFT JOIN specialties s ON s.id = d.specialty_id WHERE d.user_id = $1"
        : "SELECT a.*, p.name AS patient_name, p.lastname AS patient_lastname, CONCAT(p.name || ' ' ||p.lastname) AS patient_fullname, d.name AS doctor_name, d.lastname AS doctor_lastname, CONCAT(d.name || ' ' ||d.lastname) AS doctor_fullname, ROUND(s.hourly_rate * (EXTRACT(EPOCH FROM (a.end_time - a.start_time)) / 3600), 2) AS appointment_price FROM appointments a LEFT JOIN patients p ON p.id = a.patient_id LEFT JOIN doctors d ON d.id = a.doctor_id LEFT JOIN specialties s ON s.id = d.specialty_id WHERE p.user_id = $1";
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
    const result = await pool.query(
      "SELECT a.*, p.name AS patient_name, p.lastname AS patient_lastname, CONCAT(p.name || ' ' ||p.lastname) AS patient_fullname, d.name AS doctor_name, d.lastname AS doctor_lastname, CONCAT(d.name || ' ' ||d.lastname) AS doctor_fullname, ROUND(s.hourly_rate * (EXTRACT(EPOCH FROM (a.end_time - a.start_time)) / 3600), 2) AS appointment_price FROM appointments a LEFT JOIN patients p ON p.id = a.patient_id LEFT JOIN doctors d ON d.id = a.doctor_id LEFT JOIN specialties s ON s.id = d.specialty_id",
    );
    return result.rows;
  }

  static async getById(id: number) {
    const result = await pool.query(
      "SELECT * FROM appointments WHERE id = $1",
      [id],
    );
    return result.rows[0];
  }

  static async update(id: number, appointment: any) {
    const query = `
      UPDATE appointments SET patient_id=$1, doctor_id=$2, appointment_date=$3, start_time=$4, end_time=$5 WHERE id=$6 RETURNING *`;
    const values = [
      appointment.patient_id,
      appointment.doctor_id,
      appointment.appointment_date,
      appointment.start_time,
      appointment.end_time,
      id,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

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
