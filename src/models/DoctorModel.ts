import pool from "../config/db";

class DoctorModel {
  async create(doctor: any) {
    const query = `
      INSERT INTO doctors (first_name, last_name, specialty, phone, email, work_schedule)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const values = [
      doctor.firstName,
      doctor.lastName,
      doctor.specialty,
      doctor.phone,
      doctor.email,
      doctor.workSchedule,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async getAll() {
    const result = await pool.query("SELECT * FROM doctors");
    return result.rows;
  }

  async getById(id: number) {
    const result = await pool.query("SELECT * FROM doctors WHERE id = $1", [id]);
    return result.rows[0];
  }

  async update(id: number, doctor: any) {
    const query = `
      UPDATE doctors SET first_name=$1, last_name=$2, specialty=$3, phone=$4, email=$5, work_schedule=$6
      WHERE id=$7 RETURNING *`;
    const values = [
      doctor.firstName,
      doctor.lastName,
      doctor.specialty,
      doctor.phone,
      doctor.email,
      doctor.workSchedule,
      id,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async delete(id: number) {
    await pool.query("DELETE FROM doctors WHERE id = $1", [id]);
    return { message: "Doctor deleted successfully" };
  }
}

export default new DoctorModel();
