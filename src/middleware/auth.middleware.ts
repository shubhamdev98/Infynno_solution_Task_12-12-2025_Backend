import { Request, Response, NextFunction } from "express";
import { Jwt } from "../utils/Jwt";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check for token in Authorization header first (Bearer token)
  let token: string | undefined =
    req.headers.authorization?.replace("Bearer ", "");

  // Fallback to cookie if Authorization header is not present
  if (!token) {
    token = req.cookies?.accessToken;
  }

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = Jwt.verifyAccessToken(token);

    // Attach user to request
    (req as any).user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
