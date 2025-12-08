import express, { type Request, type Response } from "express";

const router = express.Router();

router.post("/add", (req: Request, res: Response) => {
  const userId = req.userId;
  const { mediaId } = req.body;

  console.log(`user: ${userId} tried add bookmark for content: ${mediaId}`);

  return res.status(200).json({ message: "received request" });
});

export default router;
