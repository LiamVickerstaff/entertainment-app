import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { redisClient } from "..";

export async function checkJWTAndCSRF(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("Checking JWT and CSRF");
  // Get the auth token from cookie
  const jwtToken = req.cookies.jwt_token;

  // Check token is there, therefore authorized or not
  if (!jwtToken) {
    console.error("no jwt token attached to request");
    return res.status(401).json({ error: "Not authenticated" });
  }

  // If authorized extract payload
  let payload: AuthTokenPayload;
  try {
    payload = jwt.verify(
      jwtToken,
      process.env.JWT_SECRET || ""
    ) as AuthTokenPayload;
  } catch (error) {
    console.error("jwt token failed verification:", error);
    return res.status(401).json({ error: "Not authenticated" });
  }

  // Attach user id to req payload
  if (!payload?.userId) {
    console.error("Invalid token payload, no userId");
    return res.status(401).json({ error: "Not authenticated" });
  }
  req.userId = payload.userId;

  // Get csrf token from redis session
  let csrfTokenFromRedis;
  try {
    csrfTokenFromRedis = await redisClient.get(
      `${payload.userId}-csrf-session`
    );
  } catch (error) {
    console.error(`Redis GET error:`, error);
    return res.status(500).json({ error: "Couldn't reach redis store" });
  }

  // Get csrf token from request headers
  const csrfTokenFromHeader = req.headers["x-csrf-token"];

  // Check csrf tokens match
  if (!csrfTokenFromHeader || csrfTokenFromHeader !== csrfTokenFromRedis) {
    return res.status(403).json({ error: "Invalid CSRF token" });
  }

  next();
}

interface AuthTokenPayload extends jwt.JwtPayload {
  userId: string;
}
