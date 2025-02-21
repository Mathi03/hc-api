import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { GetUserDto } from "../dtos/GetUserDto";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"
    if (!token) {
      res.status(401).json({ message: "Authorization token missing" });
    } else {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string,
      ) as GetUserDto;
      req.currentUser = decoded;
      next();
    }
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};
