// src/models/DoctorModel.ts
import pool from "../config/db";
import { CreateDoctorDto } from "../dtos/CreateDoctorDto";

export class DoctorModel {
  static async getAll(withDetail: boolean) {
    const query = withDetail
      ? `SELECT doctors.*, specialties.name AS specialty_name, specialties.label, specialties.hourly_rate 
         FROM doctors 
         LEFT JOIN specialties ON doctors.specialty_id = specialties.id`
      : "SELECT * FROM doctors";
    const { rows } = await pool.query(query);
    return rows;
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
  static async createDoctor(data: CreateDoctorDto, userId: number) {
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
    return rows[0];
  }

  static async update(
    id: number,
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    specialtyId: number,
  ) {
    const { rows } = await pool.query(
      "UPDATE doctors SET first_name = $1, last_name = $2, phone = $3, email = $4, specialty_id = $5 WHERE id = $6 RETURNING *",
      [firstName, lastName, phone, email, specialtyId, id],
    );
    return rows[0];
  }

  static async delete(id: number) {
    await pool.query("DELETE FROM doctors WHERE id = $1", [id]);
    return { message: "Doctor deleted successfully" };
  }
}
