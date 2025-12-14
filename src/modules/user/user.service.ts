import bcrypt from "bcryptjs";
import { UserRepository } from "./user.repository";
import { Jwt } from "../../utils/Jwt";
import { ApiError } from "../../utils/ApiError";

export const UserService = {
  register: async (data: any) => {
    const existingUser = await UserRepository.findByEmail(data.email);
    if (existingUser) throw new ApiError(400, "Email already registered");

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await UserRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      refreshToken: null,
    });

    const accessToken = Jwt.generateAccessToken({ id: user.id });
    const refreshToken = Jwt.generateRefreshToken({ id: user.id });

    await UserRepository.updateRefreshToken(user.id, refreshToken);

    return { user, accessToken, refreshToken };
  },

  login: async (email: string, password: string) => {
    const user = await UserRepository.findByEmail(email);
    if (!user) throw new ApiError(400, "Invalid email or password");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new ApiError(400, "Invalid email or password");

    const accessToken = Jwt.generateAccessToken({ id: user.id });
    const refreshToken = Jwt.generateRefreshToken({ id: user.id });

    await UserRepository.updateRefreshToken(user.id, refreshToken);

    return { user, accessToken, refreshToken };
  },

  refreshAccessToken: async (refreshToken: string) => {
    if (!refreshToken) throw new ApiError(401, "No refresh token");

    let decoded: any;
    try {
      decoded = Jwt.verifyRefreshToken(refreshToken);
    } catch {
      throw new ApiError(401, "Invalid or expired refresh token");
    }

    const user = await UserRepository.findById(decoded.id);
    if (!user) throw new ApiError(404, "User not found");

    if (user.refreshToken !== refreshToken) {
      throw new ApiError(401, "Refresh token mismatch");
    }

    const newAccessToken = Jwt.generateAccessToken({ id: user.id });
    const newRefreshToken = Jwt.generateRefreshToken({ id: user.id });

    await UserRepository.updateRefreshToken(user.id, newRefreshToken);

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  },

  getProfile: async (id: number) => {
    const user = await UserRepository.findById(id);
    if (!user) throw new ApiError(404, "User not found");
    return user;
  },

  logout: async (userId: number) => {
    // Invalidate refresh token in database
    await UserRepository.updateRefreshToken(userId, null);
  },
};
