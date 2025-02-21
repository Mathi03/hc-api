import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db";
import { AuthDTO } from "../dtos/AuthDTO";
import { CreateUserDto } from "../dtos/CreateUserDto";
import { getUserByUsername, User } from "../models/userModel";

class AuthService {
  async signup(userDto: CreateUserDto) {
    const user: User = userDto.toModel();
    const query = `
    INSERT INTO users (name, lastname, identifier, dob, email, sex, username, password, phone, city, tyc,  country)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *;
  `;
    const values = [
      user.name,
      user.lastname,
      user.identifier,
      user.dob,
      user.email,
      user.sex,
      user.username.toLowerCase(),
      user.password,
      // user.sponsor,
      // user.closer,
      user.phone,
      user.city,
      // user.zipcode,
      user.tyc,
      // user.is_admin,
      // user.kitId,
      // user.drop,
      // user.ia,
      // user.impact,
      // user.trading,
      user.country,
    ];

    const result = await pool.query(query, values);
    const newUser: User = (await result.rows[0]) as User;
    return { success: true, data: { user: newUser } };
  }

  async signin(authDto: AuthDTO) {
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
          // status: user.status,
          // is_admin: user.is_admin,
          // kit_id: user.kit_id,
          created_at: user.created_at,
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
