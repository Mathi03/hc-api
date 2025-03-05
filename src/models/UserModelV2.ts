import pool from "../config/db";
import bcrypt from "bcrypt";

export class UserModel {
  static async getPassword(userId: number) {
    const { rows } = await pool.query(
      "SELECT password FROM users WHERE id = $1",
      [userId],
    );
    return rows[0]?.password;
  }

  static async updatePassword(userId: number, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.query("UPDATE users SET password = $1 WHERE id = $2", [
      hashedPassword,
      userId,
    ]);
  }
}
