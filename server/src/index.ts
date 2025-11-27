import express, { type Request, type Response } from "express";
import dotenv from "dotenv";
import authenticationRouter from "./routes/authenticationRouter";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routers
app.use("/auth", authenticationRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// Run App
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
