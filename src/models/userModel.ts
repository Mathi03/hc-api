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
  // sponsor?: string;
  // closer?: string;
  phone: string;
  city: string;
  // zipcode: string;
  tyc: boolean;
  // is_admin: boolean;
  // kitId: number | undefined;
  // status: string;
  created: string;
  updated: string;
  // drop: boolean;
  // ia: boolean;
  // impact: boolean;
  // trading: boolean;
  country?: string;
  // is_distributor?: boolean;
  // distributorExpiration?: Date;
}
export const getUserByUsername = async (
  username: string,
): Promise<GetUserDto> => {
  const query = `SELECT id, external_id, name, lastname, username, email, password, created_at FROM users WHERE username = $1`;
  const result = await pool.query(query, [username.toLowerCase()]);
  console.log(result.rows[0]);
  return result.rows[0];
};
