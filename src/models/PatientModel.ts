import pool from "../config/db";
import { CreatePatientDto } from "../dtos/CreatePatientDto";

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
    const result = await pool.query(
      "SELECT p.* FROM patients p LEFT JOIN users u ON u.id = p.user_id WHERE u.status NOT IN ('deleted')",
    );
    return result.rows;
  }

  async getById(id: number) {
    const result = await pool.query("SELECT * FROM patients WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  }

  async update(id: number, patient: any) {
    const query = `
      UPDATE patients SET name=$1, lastname=$2, dob=$3, gender=$4, address=$5, phone=$6, email=$7, social_security_number=$8
      WHERE id=$9 RETURNING *`;
    const values = [
      patient.name,
      patient.lastname,
      patient.dob,
      patient.gender,
      patient.address,
      patient.phone,
      patient.email,
      patient.social_security_number,
      id,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async delete(id: number) {
    await pool.query(
      "UPDATE users SET status='deleted' WHERE id = (SELECT user_id FROM patients WHERE id = $1 LIMIT 1)",
      [id],
    );
    return "Patient deleted successfully";
  }
  async createUser(data: CreatePatientDto) {
    try {
      await pool.query("BEGIN");
      const userQuery = `INSERT INTO users (name, lastname, identifier, dob, email, sex, username, password, phone, city, country, role, tyc) 
                         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 'patient', $12) RETURNING id`;
      const values = [
        data.name,
        data.lastname,
        data.identifier,
        data.dob,
        data.email,
        data.sex,
        data.username.toLowerCase(),
        data.password,
        data.phone,
        data.city,
        data.country,
        data.tyc,
      ];
      const userResult = await pool.query(userQuery, values);
      const userId = userResult.rows[0].id;
      return userId;
    } catch (error) {
      await pool.query("ROLLBACK");
      throw error;
    }
  }
  async createPatient(data: CreatePatientDto, userId: number) {
    try {
      const { rows } = await pool.query(
        "INSERT INTO patients (name, lastname, dob, gender, address, phone, email, social_security_number, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
        [
          data.name,
          data.lastname,
          data.dob,
          data.sex,
          data.address,
          data.phone,
          data.email,
          data.social_security_number,
          userId,
        ],
      );
      await pool.query("COMMIT");

      return rows[0];
    } catch (error) {
      await pool.query("ROLLBACK");
      throw error;
    }
  }
}

export default new PatientModel();
