import jwt, { JwtPayload } from "jsonwebtoken";
import { Config } from "../config/env";
import {
  JWT_ACCESS_TOKEN_EXPIRY,
  JWT_REFRESH_TOKEN_EXPIRY,
} from "../constant/general";

export class Jwt {
  private static accessSecret = Config.get("JWT_ACCESS_SECRET");
  private static refreshSecret = Config.get("JWT_REFRESH_SECRET");

  static generateAccessToken(payload: object): string {
    return jwt.sign(payload, this.accessSecret, {
      expiresIn: JWT_ACCESS_TOKEN_EXPIRY,
    });
  }

  static generateRefreshToken(payload: object): string {
    return jwt.sign(payload, this.refreshSecret, {
      expiresIn: JWT_REFRESH_TOKEN_EXPIRY,
    });
  }

  static verifyAccessToken(token: string): string | JwtPayload {
    return jwt.verify(token, this.accessSecret);
  }

  static verifyRefreshToken(token: string): string | JwtPayload {
    return jwt.verify(token, this.refreshSecret);
  }
}
