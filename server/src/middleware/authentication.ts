import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Get the auth token from cookie
  const token = req.cookies.auth_token;
  console.log("token:", token);

  // Check token is there, therefore authorized or not
  if (!token) {
    console.error("no token attached to request");
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
    console.error("token failed verification:", error);
    return res.status(401).json({ error: "Not authenticated" });
  }

  // Attach user id to req payload
  if (!payload?.userId) {
    console.error("Invalid token payload");
    return res.status(401).json({ error: "Not authenticated" });
  }

  req.userId = payload.userId;

  next();
}

interface AuthTokenPayload extends jwt.JwtPayload {
  userId: string;
}
