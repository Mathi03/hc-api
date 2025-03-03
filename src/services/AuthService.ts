import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db";
import { LoginDTO } from "../dtos/LoginDTO";
import { CreateUserDto } from "../dtos/CreateUserDto";
import { getUserByUsername, User } from "../models/userModel";

class AuthService {
  async signup(userDto: CreateUserDto) {
    const userData: User = userDto.toModel();
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const userQuery = `INSERT INTO users (name, lastname, identifier, dob, email, sex, username, password, phone, city, country, role, tyc) 
                         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 'patient', $12) RETURNING *`;
      const values = [
        userData.name,
        userData.lastname,
        userData.identifier,
        userData.dob,
        userData.email,
        userData.sex,
        userData.username.toLowerCase(),
        userData.password,
        userData.phone,
        userData.city,
        userData.country,
        userData.tyc,
      ];
      const userResult = await client.query(userQuery, values);
      const user = userResult.rows[0];

      const patientQuery = `INSERT INTO patients (name, lastname, dob, gender, phone, email, user_id) 
                            VALUES ($1, $2, $3, $4, $5, $6, $7)`;
      const patientValues = [
        user.name,
        user.lastname,
        user.dob,
        user.sex,
        user.phone,
        user.email,
        user.id,
      ];
      await client.query(patientQuery, patientValues);

      await client.query("COMMIT");
      // const result = await pool.query(query, values);
      // const newUser: User = (await result.rows[0]) as User;
      return { success: true, data: { user } };
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  async signin(authDto: LoginDTO) {
    const { username, password } = authDto;

    const user = await getUserByUsername(username);
    if (!user) {
      throw new Error("Credenciales invalidas.");
      // } else if (user && user.status == "inactive") {
      //   throw new Error(
      //     "Usuario inactivo. Revisa tu email y utiliza el link de activacion",
      //   );
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Credenciales invalidas.");
      }

      const token = jwt.sign(
        {
          id: user.id,
          external_id: user.external_id,
          name: user.name,
          lastname: user.lastname,
          username: user.username,
          email: user.email,
          password: user.password,
          created_at: user.created_at,
          role: user.role,
        },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" },
      );
      console.log(
        `Login user: ${user.username} - userId: ${user.id} - created_at: ${user.created_at}`,
      );
      return { token, user };
    }
  }
}

export default new AuthService();
