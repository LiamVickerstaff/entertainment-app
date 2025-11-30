import express, { type Request, type Response } from "express";
import { prisma } from "../lib/prisma";
import { hashPassword } from "../utils/authUtils";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Missing email or password" });

  try {
    const userAccount = await prisma.user.findUnique({ where: { email } });

    if (!userAccount)
      return res
        .status(404)
        .json({ error: `Couldn't find user of email: ${email}` });

    const passwordsMatch = await bcrypt.compare(
      password,
      userAccount!.password
    );

    if (!passwordsMatch)
      return res.status(401).json({ error: "Passwords do not match" });

    sendAuthCookie(res, { userId: userAccount.id, email: userAccount.email });

    return res.status(200).json({
      message: "Successful login",
      user: { id: userAccount.id, email: userAccount.email },
    });
  } catch (error) {
    console.error("Error with user login: ", error);
    return res.status(500).json({ error: `Error with user login: ${error}` });
  }
});

router.post("/signup", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Missing email or password" });

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return res.status(409).json({ error: "User already exists" });

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    sendAuthCookie(res, { userId: newUser.id, email: newUser.email });

    res
      .status(201)
      .json({ message: "User created successfully", userId: newUser.id });
  } catch (error) {
    console.error("Signup error: ", error);
    res.status(500).json({ error: "Signup was unsuccessful" });
  }
});

export default router;

function sendAuthCookie(
  res: Response,
  payload: { userId: string; email: string }
) {
  const token = jwt.sign(
    { userId: payload.userId, email: payload.email },
    process.env.JWT_SECRET!,
    {
      expiresIn: "7d",
    }
  );

  res.cookie("auth_token", token, {
    httpOnly: true,

    // must be true in production (over HTTPS) and false in development (over HTTP)
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "strict",
  });
}
