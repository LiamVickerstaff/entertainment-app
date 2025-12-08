import express, { type Request, type Response } from "express";
import dotenv from "dotenv";
import { createClient } from "redis";
import cors from "cors";
import cookieParser from "cookie-parser";
// ROUTERS
import authenticationRouter from "./routes/authRouter";
import tmdbRouter from "./routes/tmdbRouter";
import bookmarkRouter from "./routes/bookmarksRouter";
import { authMiddleware } from "./middleware/authentication";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Redis Client
export const redisClient = createClient({
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
app.use(cookieParser());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.CORS_ORIGIN // production url
        : [
            "http://localhost:5173", // Local development frontend running on your laptop
            "http://192.168.0.6:5173", // local wifi network url from devices (Phone / Ipad)
            "http://172.20.10.9:5173", //  iPhone Personal Hotspot url
          ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routers
app.use("/auth", authenticationRouter);
app.use("/tmdb", tmdbRouter);
app.use("/bookmark", authMiddleware, bookmarkRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// Run App
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
