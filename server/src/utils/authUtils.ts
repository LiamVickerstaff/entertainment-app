import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { Response } from "express";

export async function hashPassword(password: string) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export function attachAuthCookie(res: Response, payload: { userId: string }) {
  const token = jwt.sign({ userId: payload.userId }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  res.cookie("auth_token", token, {
    httpOnly: true,

    // must be true in production (over HTTPS) and false in development (over HTTP)
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    path: "/",
  });
}
