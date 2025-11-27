import express, { type Request, type Response } from "express";
import dotenv from "dotenv";
import authenticationRouter from "./routes/authenticationRouter";
import { createClient } from "redis";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Redis Client
const redisClient = createClient({
  username: process.env.redisUsername || "",
  password: process.env.redisPassword || "",
  socket: {
    host: process.env.redisHost || "",
    port: 19561,
  },
});
redisClient.on("error", (err) => console.log("Redis Client Error: ", err));
await redisClient.connect();

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
