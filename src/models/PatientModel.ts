import pool from "../config/db";

class PatientModel {
  async create(patient: any) {
    const query = `
      INSERT INTO patients (first_name, last_name, birth_date, gender, address, phone, email, social_security_number)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
    const values = [
      patient.firstName,
      patient.lastName,
      patient.birthDate,
      patient.gender,
      patient.address,
      patient.phone,
      patient.email,
      patient.socialSecurityNumber,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async getAll() {
    const result = await pool.query("SELECT * FROM patients");
    return result.rows;
  }

  async getById(id: number) {
    const result = await pool.query("SELECT * FROM patients WHERE id = $1", [id]);
    return result.rows[0];
  }

  async update(id: number, patient: any) {
    const query = `
      UPDATE patients SET first_name=$1, last_name=$2, birth_date=$3, gender=$4, address=$5, phone=$6, email=$7, social_security_number=$8
      WHERE id=$9 RETURNING *`;
    const values = [
      patient.firstName,
      patient.lastName,
      patient.birthDate,
      patient.gender,
      patient.address,
      patient.phone,
      patient.email,
      patient.socialSecurityNumber,
      id,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async delete(id: number) {
    await pool.query("DELETE FROM patients WHERE id = $1", [id]);
    return { message: "Patient deleted successfully" };
  }
}

export default new PatientModel();
