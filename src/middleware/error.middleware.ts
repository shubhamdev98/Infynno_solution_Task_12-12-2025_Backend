import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';
import { ZodError } from 'zod';
import jwt from 'jsonwebtoken';

export const errorMiddleware = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  /* ------------------ ZOD VALIDATION ERRORS ------------------ */
  if (err instanceof ZodError) {
    const formattedErrors: Record<string, string> = {};

    err.issues.forEach((issue) => {
      const field = issue.path[0];
      if (field) {
        formattedErrors[field as string] = issue.message;
      }
    });

    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: formattedErrors,
    });
  }

  /* ------------------ CUSTOM API ERRORS ------------------ */
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.details ?? null,
    });
  }

  /* ------------------ JWT ERRORS ------------------ */
  if (
    err instanceof jwt.JsonWebTokenError ||
    err instanceof jwt.TokenExpiredError
  ) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }

  /* ------------------ UNKNOWN ERRORS ------------------ */
  console.error('Unhandled error:', err);

  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
};
