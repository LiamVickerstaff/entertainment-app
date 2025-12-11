import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { Response } from "express";
import crypto from "crypto";
import { redisClient } from "..";

export async function hashPassword(password: string) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export async function attachJWTAndCSRFCookies(res: Response, userId: string) {
  const newJWTToken = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

  const newCSRFToken = crypto.randomBytes(32).toString("hex"); // ask about this
  const redisTTL = 60 * 60 * 24; // 1 day

  // store the csrf session in redis
  try {
    await redisClient.set(`${userId}-csrf-session`, newCSRFToken, {
      EX: redisTTL,
    });
    console.log("successfully saved csrf session to redis");
  } catch (error) {
    console.error(`Redis SET error for ${userId}-csrf-session`, error);
  }

  // attach jwt cookie
  res.cookie("jwt_token", newJWTToken, {
    httpOnly: true,
    // must be true in production (over HTTPS) and false in development (over HTTP)
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    path: "/",
  });

  // attach csrf token
  res.cookie("csrf_token", newCSRFToken, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    path: "/",
  });
}
