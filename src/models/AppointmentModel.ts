import pool from "../config/db";

class AppointmentModel {
  async create(appointment: any) {
    const query = `
      INSERT INTO appointments (patient_id, doctor_id, date_time, status)
      VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [
      appointment.patientId,
      appointment.doctorId,
      appointment.dateTime,
      appointment.status,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async getAll() {
    const result = await pool.query("SELECT * FROM appointments");
    return result.rows;
  }

  async getById(id: number) {
    const result = await pool.query("SELECT * FROM appointments WHERE id = $1", [id]);
    return result.rows[0];
  }

  async update(id: number, appointment: any) {
    const query = `
      UPDATE appointments SET patient_id=$1, doctor_id=$2, date_time=$3, status=$4
      WHERE id=$5 RETURNING *`;
    const values = [
      appointment.patientId,
      appointment.doctorId,
      appointment.dateTime,
      appointment.status,
      id,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async delete(id: number) {
    await pool.query("DELETE FROM appointments WHERE id = $1", [id]);
    return { message: "Appointment deleted successfully" };
  }
}

export default new AppointmentModel();
