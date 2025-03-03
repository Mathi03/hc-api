import pool from "../config/db";

export class SpecialtyModel {
  static async getAll() {
    const { rows } = await pool.query("SELECT * FROM specialties");
    return rows;
  }

  static async getById(id: number) {
    const { rows } = await pool.query(
      "SELECT * FROM specialties WHERE id = $1",
      [id],
    );
    return rows[0];
  }

  static async create(name: string, label: string, hourlyRate: number) {
    const { rows } = await pool.query(
      "INSERT INTO specialties (name, label, hourly_rate) VALUES ($1, $2, $3) RETURNING *",
      [name, label, hourlyRate],
    );
    return rows[0];
  }

  static async update(
    id: number,
    name: string,
    label: string,
    hourlyRate: number,
  ) {
    const { rows } = await pool.query(
      "UPDATE specialties SET name = $1, label = $2, hourly_rate = $3 WHERE id = $4 RETURNING *",
      [name, label, hourlyRate, id],
    );
    return rows[0];
  }

  static async delete(id: number) {
    await pool.query("DELETE FROM specialties WHERE id = $1", [id]);
    return "Specialty deleted successfully";
  }
}
