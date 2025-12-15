import jwt from "jsonwebtoken";

export interface AuthTokenPayload extends jwt.JwtPayload {
  userId: string;
}
