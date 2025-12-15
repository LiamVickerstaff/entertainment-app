import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { redisClient } from "..";
import { AuthTokenPayload } from "../types/authTypes";
import { verifyJWTCookie } from "../utils/authUtils";

export async function checkJWTAndCSRF(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("Checking JWT and CSRF");
  // Get the jwt and csrf tokens
  const jwtToken = req.cookies.jwt_token;
  const headerCSRFToken = req.headers["x-csrf-token"];

  let userId: string;

  try {
    userId = await verifyJWTCookie(jwtToken);
  } catch (error) {
    return res.status(403).json({ message: "Not authenticated", error });
  }

  // Get csrf token from redis session
  let csrfTokenFromRedis;
  try {
    csrfTokenFromRedis = await redisClient.get(`${userId}-csrf-session`);
    console.log("Retreived csrfTokenFromRedis:", csrfTokenFromRedis);
  } catch (error) {
    console.error(`Redis GET error:`, error);
    return res.status(500).json({ error: "Couldn't reach redis store" });
  }

  // Check csrf tokens match
  if (!headerCSRFToken || headerCSRFToken !== csrfTokenFromRedis) {
    console.log(
      `browser csrf and redis csrf do not match: headerCSRFToken: ${headerCSRFToken}, csrfTokenFromRedis: ${csrfTokenFromRedis}`
    );
    return res.status(403).json({ error: "Invalid CSRF token" });
  }

  next();
}
