import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user as User;
    next();
  });
};