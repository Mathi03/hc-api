import { UserModel } from "../models/UserModelV2";
import bcrypt from "bcrypt";

export class UserService {
  static async changePassword(userId: number, currentPassword: string, newPassword: string) {
    const storedPassword = await UserModel.getPassword(userId);

    if (!storedPassword || !(await bcrypt.compare(currentPassword, storedPassword))) {
      throw new Error("Contraseña actual incorrecta");
    }

    await UserModel.updatePassword(userId, newPassword);
    return { message: "Contraseña actualizada exitosamente" };
  }
}
