export const successResponse = (data: any, message = "Success") => {
  return {
    success: true,
    message,
    data,
  };
};

export const errorResponse = (message: string, statusCode = 400, errors?: any) => {
  return {
    success: false,
    message,
    errors: errors || null,
    statusCode,
  };
};
