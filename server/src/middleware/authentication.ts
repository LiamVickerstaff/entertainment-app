import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Get the auth token from cookie
  const token = req.cookies.auth_token;

  // Check token is there, therefore authorized or not
  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  // If authorized extract payload
  let payload: AuthTokenPayload;

  try {
    payload = jwt.verify(
      token,
      process.env.JWT_SECRET || ""
    ) as AuthTokenPayload;
  } catch (error) {
    return res.status(401).json({ error: "Not authorized" });
  }

  // Attach user id to req payload
  if (!payload || !payload.userId) {
    return res.status(401).json({ error: "Auth token missing payload" });
  }

  req.user = { id: payload.userId };

  next();
}

interface AuthTokenPayload extends jwt.JwtPayload {
  userId: string;
}
