import pool from "../config/db";
import { GetUserDto } from "../dtos/GetUserDto";

export interface User {
  id: number;
  external_id: string;
  name: string;
  lastname: string;
  identifier: string;
  dob: string;
  email: string;
  sex: string;
  username: string;
  password: string;
  phone: string;
  city: string;
  tyc: boolean;
  created: string;
  updated: string;
  country?: string;
}
export const getUserByUsername = async (
  username: string,
): Promise<GetUserDto> => {
  const query = `SELECT id, external_id, name, lastname, username, email, password, created_at, role FROM users WHERE username = $1`;
  const result = await pool.query(query, [username.toLowerCase()]);
  console.log(result.rows[0]);
  return result.rows[0];
};
