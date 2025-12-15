import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { Response } from "express";
import crypto from "crypto";
import { redisClient } from "..";
import { AuthTokenPayload } from "../types/authTypes";

export async function hashPassword(password: string) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export async function attachJWTCookie(res: Response, userId: string) {
  const newJWTToken = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

  // attach jwt cookie
  res.cookie("jwt_token", newJWTToken, {
    httpOnly: true,
    // must be true in production (over HTTPS) and false in development (over HTTP)
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    path: "/",
  });
}

export async function verifyJWTCookie(
  jwtToken: string | undefined
): Promise<string> {
  if (!jwtToken) {
    console.error("no jwt token attached to request");
    throw new Error("Not authenticated");
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
    throw new Error("Not Authenticated");
  }

  // Attach user id to req payload
  if (!payload?.userId) {
    console.error("Invalid token payload, no userId");
    throw new Error("Not Authenticated");
  }

  return payload.userId;
}

export async function setCSRFSessionToken(userId: string): Promise<string> {
  const newCSRFToken = crypto.randomBytes(64).toString("hex");

  try {
    await redisClient.set(`${userId}-csrf-session`, newCSRFToken);
    return newCSRFToken;
  } catch (error) {
    console.error(`Redis SET error:`, error);
    throw new Error("Error reaching redis store");
  }
}
