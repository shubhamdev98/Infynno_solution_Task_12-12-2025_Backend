export const successResponse = (data: unknown, message = 'Success') => {
  return {
    success: true,
    message,
    data,
  };
};

export const errorResponse = (
  message: string,
  statusCode = 400,
  errors?: unknown
) => {
  return {
    success: false,
    message,
    errors: errors || null,
    statusCode,
  };
};
