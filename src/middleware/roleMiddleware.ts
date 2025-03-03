import { Request, Response, NextFunction } from "express";

export const roleMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.currentUser || !allowedRoles.includes(req.currentUser.role)) {
      res.status(403).json({ message: "Access denied" });
      return;
    }
    next();
  };
};
