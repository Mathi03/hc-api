import { GetUserDto } from "../dtos/GetUserDto";

declare global {
  namespace Express {
    interface Request {
      currentUser?: GetUserDto;
    }
  }
}
