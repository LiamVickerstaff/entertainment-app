import express, { type Request, type Response } from "express";

const router = express.Router();

router.get("/login", (req: Request, res: Response) => {
  res.json({ message: "logged in" });
});

router.post("/signup", (req: Request, res: Response) => {
  res.json({ message: "signing up new account" });
});

export default router;
