// src/models/DoctorModel.ts
import pool from "../config/db";
import { CreateDoctorDto } from "../dtos/CreateDoctorDto";

export class DoctorModel {
  static async getAll(specialtyId: number) {
    if (specialtyId) {
      const query = `SELECT doctors.*, specialties.name AS specialty_name, specialties.label, specialties.hourly_rate 
         FROM doctors LEFT JOIN users u ON u.id = doctors.user_id
         LEFT JOIN specialties ON doctors.specialty_id = specialties.id WHERE doctors.specialty_id = $1 AND u.status NOT IN ('deleted')`;
      const values = [specialtyId];
      const { rows } = await pool.query(query, values);
      return rows;
    } else {
      const query = `SELECT doctors.*, specialties.name AS specialty_name, specialties.label, specialties.hourly_rate 
         FROM doctors LEFT JOIN users u ON u.id = doctors.user_id
         LEFT JOIN specialties ON doctors.specialty_id = specialties.id WHERE u.status NOT IN ('deleted')`;
      const { rows } = await pool.query(query);
      return rows;
    }
  }

  static async getById(id: number) {
    const { rows } = await pool.query("SELECT * FROM doctors WHERE id = $1", [
      id,
    ]);
    return rows[0];
  }

  static async createUser(data: CreateDoctorDto) {
    try {
      await pool.query("BEGIN");
      const userQuery = `INSERT INTO users (name, lastname, identifier, dob, email, sex, username, password, phone, city, country, role, tyc) 
                         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 'doctor', $12) RETURNING id`;
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
  static async createDoctor(data: CreateDoctorDto, userId: number) {
    try {
      const { rows } = await pool.query(
        "INSERT INTO doctors (name, lastname, phone, email, user_id, specialty_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [
          data.name,
          data.lastname,
          data.phone,
          data.email,
          userId,
          data.specialty_id,
        ],
      );
      await pool.query("COMMIT");

      return rows[0];
    } catch (error) {
      await pool.query("ROLLBACK");
      throw error;
    }
  }

  static async update(
    id: number,
    name: string,
    lastName: string,
    phone: string,
    email: string,
    specialtyId: number,
  ) {
    const { rows } = await pool.query(
      "UPDATE doctors SET name = $1, lastname = $2, phone = $3, email = $4, specialty_id = $5 WHERE id = $6 RETURNING *",
      [name, lastName, phone, email, specialtyId, id],
    );
    return rows[0];
  }

  static async delete(id: number) {
    // await pool.query("DELETE FROM doctors WHERE id = $1", [id]);
    await pool.query(
      "UPDATE users SET status='deleted' WHERE id = (SELECT user_id FROM doctors WHERE id = $1 LIMIT 1)",
      [id],
    );
    return "Doctor deleted successfully";
  }
}
