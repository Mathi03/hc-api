import pool from "../config/db";

export class WorkingHoursModel {
  static async create(
    doctorId: number,
    dayOfWeek: string,
    startTime: string,
    endTime: string,
  ) {
    const { rows } = await pool.query(
      "INSERT INTO working_hours (doctor_id, day_of_week, start_time, end_time) VALUES ($1, $2, $3, $4) RETURNING *",
      [doctorId, dayOfWeek, startTime, endTime],
    );
    return rows[0];
  }

  static async getByDoctorId(doctorId: number) {
    const { rows } = await pool.query(
      "SELECT * FROM working_hours WHERE doctor_id = $1",
      [doctorId],
    );
    return rows;
  }

  static async update(id: number, startTime: string, endTime: string) {
    const { rows } = await pool.query(
      "UPDATE working_hours SET start_time = $1, end_time = $2 WHERE id = $3 RETURNING *",
      [startTime, endTime, id],
    );
    return rows[0];
  }

  static async delete(id: number) {
    await pool.query("DELETE FROM working_hours WHERE id = $1", [id]);
    return { message: "Working Hour deleted successfully" };
  }

  static async getWorkingHours(doctorId: number, dayOfWeek: string) {
    const { rows } = await pool.query(
      "SELECT start_time, end_time FROM working_hours WHERE doctor_id = $1 AND day_of_week = $2",
      [doctorId, dayOfWeek],
    );
    return rows[0];
  }

  static async getAppointments(doctorId: number, date: string) {
    const { rows } = await pool.query(
      "SELECT start_time, end_time FROM appointments WHERE doctor_id = $1 AND appointment_date = $2",
      [doctorId, date],
    );
    return rows;
  }
}
