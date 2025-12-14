import { DataTypes, Model, Sequelize, Optional } from "sequelize";
import { IUser, IUserCreation } from "../modules/user/user.types";

export interface UserInstance extends Model<IUser, IUserCreation>, IUser {}

export const UserModel = (sequelize: Sequelize) => {
  const User = sequelize.define<UserInstance>( 
    "User",
    {
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      refreshToken : {type: DataTypes.STRING, allowNull: true }
    },
    {
      tableName: "users",
      timestamps: true,
      paranoid: false,
    }
  );

  return User;
};
