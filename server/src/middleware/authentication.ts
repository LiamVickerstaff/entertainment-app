import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export async function checkJWTAndCSRF(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("Checking JWT and CSRF");
  // Get the auth token from cookie
  const jwtToken = req.cookies.jwt_token;
  const csrfCookieToken = req.cookies.csrf_token;
  console.log("jwtToken from browser request cookies:", jwtToken);
  console.log("csrfToken from browser request cookies:", csrfCookieToken);

  // Check token is there, therefore authorized or not
  if (!jwtToken) {
    console.error("no jwt token attached to request");
    return res.status(401).json({ error: "Not authenticated" });
  }

  // If authorized extract payload
  let payload: AuthTokenPayload;
  try {
    payload = jwt.verify(
      jwtToken,
      process.env.JWT_SECRET || ""
    ) as AuthTokenPayload;

    console.log("payload after verifying jwt token:", payload);
  } catch (error) {
    console.error("jwt token failed verification:", error);
    return res.status(401).json({ error: "Not authenticated" });
  }

  // Attach user id to req payload
  if (!payload?.userId) {
    console.error("Invalid token payload, no userId");
    return res.status(401).json({ error: "Not authenticated" });
  }
  req.userId = payload.userId;

  // Get csrf token from request headers
  const csrfTokenFromHeader = req.headers["x-csrf-token"];
  console.log("csrfToken from request header:", csrfTokenFromHeader);

  // Check csrf tokens match
  if (
    !csrfTokenFromHeader ||
    !csrfCookieToken ||
    csrfTokenFromHeader !== csrfCookieToken
  ) {
    console.log(
      `browser header csrf and cookie csrf do not match: csrfTokenFromHeader: ${csrfTokenFromHeader}, csrfCookieToken: ${csrfCookieToken}`
    );
    return res.status(403).json({ error: "Invalid CSRF token" });
  }

  console.log("After checking jwt and csrf, everything is good");

  next();
}

interface AuthTokenPayload extends jwt.JwtPayload {
  userId: string;
}
