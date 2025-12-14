import { User } from "../../config/database";

export const UserRepository = {
  create: (data: any) => User.create(data),

  findByEmail: (email: string) => User.findOne({ where: { email } }),

  findById: (id: number) => User.findByPk(id),

  updateRefreshToken: (id: number, refreshToken: string | null) =>
    User.update({ refreshToken }, { where: { id } }),
};
