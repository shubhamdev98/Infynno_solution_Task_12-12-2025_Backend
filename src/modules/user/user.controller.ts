import { Request, Response } from 'express';
import { UserService } from './user.service';
import { successResponse } from '../../constant/response';
import { AsyncHandler } from '../../utils/AsyncHandler';
import {
  COOKIE_OPTIONS,
  REFRESH_TOKEN_MAX_AGE,
  ACCESS_TOKEN_MAX_AGE,
} from '../../constant/general';

// Helper function to set refresh token cookie
const setRefreshTokenCookie = (res: Response, token: string) => {
  res.cookie('refreshToken', token, {
    ...COOKIE_OPTIONS,
    maxAge: REFRESH_TOKEN_MAX_AGE,
  });
};

// Helper function to set access token cookie
const setAccessTokenCookie = (res: Response, token: string) => {
  res.cookie('accessToken', token, {
    ...COOKIE_OPTIONS,
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });
};

// Helper function to clear auth cookies
const clearAuthCookies = (res: Response) => {
  res.clearCookie('accessToken', COOKIE_OPTIONS);
  res.clearCookie('refreshToken', COOKIE_OPTIONS);
};

export const UserController = {
  register: AsyncHandler.handle(async (req, res) => {
    const { user, accessToken, refreshToken } = await UserService.register(
      req.body
    );

    setRefreshTokenCookie(res, refreshToken);

    res
      .status(201)
      .json(
        successResponse({ user, accessToken }, 'User registered successfully')
      );
  }),

  login: AsyncHandler.handle(async (req, res) => {
    const { email, password } = req.body;

    const { user, accessToken, refreshToken } = await UserService.login(
      email,
      password
    );

    setRefreshTokenCookie(res, refreshToken);
    setAccessTokenCookie(res, accessToken);

    res.json(successResponse({ user, accessToken }, 'Login successful'));
  }),

  refresh: AsyncHandler.handle(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    const { accessToken, refreshToken: newRefreshToken } =
      await UserService.refreshAccessToken(refreshToken);

    setRefreshTokenCookie(res, newRefreshToken);
    setAccessTokenCookie(res, accessToken);

    res.json(successResponse({ accessToken }, 'Access token refreshed'));
  }),

  profile: AsyncHandler.handle(async (req, res) => {
    const userId = (req as any).user.id;

    const user = await UserService.getProfile(userId);
    res.json(successResponse({ user }, 'User profile fetched successfully'));
  }),

  logout: AsyncHandler.handle(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;

    await UserService.logout(userId);

    clearAuthCookies(res);

    res.json(successResponse({}, 'Logged out successfully'));
  }),
};
