// Cookie configuration constants
export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: false,
  sameSite: 'strict' as const,
  path: '/',
};

// Token expiration times
export const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
export const ACCESS_TOKEN_MAX_AGE = 30 * 1000; // 30 in milliseconds

// JWT token expiration strings
export const JWT_ACCESS_TOKEN_EXPIRY = '30s'; // 30 second
export const JWT_REFRESH_TOKEN_EXPIRY = '7d'; // 7 days
