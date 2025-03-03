import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import { LoginDTO } from "../dtos/LoginDTO";
import { handleError } from "../utils/errorHandler";
import { CreateUserDto } from "../dtos/CreateUserDto";
import bcrypt from "bcrypt";

class AuthController {
  async register(req: Request, res: Response) {
    const createUserDto = new CreateUserDto(req.body);

    const validationResult = createUserDto.validateRegistrationForm();

    if (!validationResult.isValid) {
      res.status(400).json({
        success: false,
        message: validationResult.errors,
      });
    } else {
      // Hash password
      const hashedPassword = await bcrypt.hash(createUserDto.password!, 10);
      createUserDto.password = hashedPassword;

      try {
        const user = await AuthService.signup(createUserDto);
        res.status(201).json(user);
      } catch (err) {
        handleError(res, err);
      }
    }
  }
  async login(req: Request, res: Response) {
    const user: LoginDTO = req.body;

    if (!user) {
      res.status(400).json({ message: "Username y password requeridos." });
    } else {
      try {
        const result = await AuthService.signin(user);
        res.status(200).json({
          success: true,
          data: result,
        });
      } catch (error) {
        console.error("Sign-in error:", error);
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        res.status(401).json({ success: false, message: errorMessage });
      }
    }
  }
}

export default new AuthController();
