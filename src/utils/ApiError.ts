export class ApiError extends Error {
  statusCode: number;
  status: number;
  details?: any;

  constructor(statusCode: number, message: string, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message: string, details?: any) {
    return new ApiError(400, message, details);
  }

  static unauthorized(message = "Unauthorized") {
    return new ApiError(401, message);
  }

  static forbidden(message = "Forbidden") {
    return new ApiError(403, message);
  }

  static notFound(message = "Not Found") {
    return new ApiError(404, message);
  }

  static conflict(message = "Conflict") {
    return new ApiError(409, message);
  }

  static internal(message = "Internal Server Error") {
    return new ApiError(500, message);
  }
}
