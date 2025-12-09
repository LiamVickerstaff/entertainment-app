import express, { type Request, type Response } from "express";
import { prisma } from "../lib/prisma";
import { attachAuthCookie, hashPassword } from "../utils/authUtils";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
  // Retrieve email and password from request + verify
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Missing email or password" });

  // Fetch userAccount from database + include their bookmarks
  try {
    const userAccount = await prisma.user.findUnique({
      where: { email },
      include: {
        bookmarks: {
          select: {
            externalId: true,
            title: true,
            mediaType: true,
            adult: true,
            posterPath: true,
            releaseDate: true,
          },
        },
      },
    });

    // Check if userAccount was found
    if (!userAccount)
      return res
        .status(404)
        .json({ error: "No account found, please create one" });

    // Check passwords match
    const passwordsMatch = await bcrypt.compare(
      password,
      userAccount!.password
    );
    if (!passwordsMatch)
      return res.status(401).json({ error: "Incorrect credentials" });

    // Attach new cookie to response
    attachAuthCookie(res, { userId: userAccount.id });

    return res.status(200).json({
      message: "Successful login",
      user: {
        username: userAccount.username,
        email: userAccount.email,
      },
      userBookmarks: userAccount.bookmarks,
    });
  } catch (error) {
    console.error("Error with user login: ", error);
    return res.status(500).json({ error: "Failed to login" });
  }
});

router.post("/signup", async (req: Request, res: Response) => {
  // Retrieve email and password from request + verify
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Missing email or password" });

  try {
    // Check if user exists already, if so tell client to login instead
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return res
        .status(409)
        .json({ error: "User already exists, please use login" });

    // Prepare data for making new user
    const hashedPassword = await hashPassword(password);
    const newUsername = email.split("@")[0];

    // Make new user in database
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username: newUsername,
      },
    });

    // Attach new cookie to response
    attachAuthCookie(res, { userId: newUser.id });

    res.status(201).json({
      message: "User created successfully",
      user: {
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Signup error: ", error);
    res.status(500).json({ error: "Failed to sign up" });
  }
});

router.post("/logout", (req: Request, res: Response) => {
  // Timeout existing auth cookie so that client will remove it and end session
  res.cookie("auth_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0), // cookie will expire immediately, hence closing session
  });

  res.status(200).json({ message: "You have been logged out" });
});

export default router;
