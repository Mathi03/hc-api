import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { handleError } from "../utils/errorHandler";

export class UserController {
  static async changePassword(req: Request, res: Response) {
    try {
      const userId = req.currentUser!.id;
      const { current_password, new_password } = req.body;

      if (!current_password || !new_password) {
        throw new Error("Se requiere la contraseña actual y la nueva");
      }

      const result = await UserService.changePassword(
        userId,
        current_password,
        new_password,
      );
      res.json(result);
    } catch (err) {
      handleError(res, err);
    }
  }
}
