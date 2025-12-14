import { Sequelize } from "sequelize";
import { UserModel } from "../models/user.model";
import { TaskModel } from "../models/task.model";
import { Config } from "../config/env";

const sequelize = new Sequelize(
  Config.get("DB_NAME"),
  Config.get("DB_USER"),
  Config.get("DB_PASSWORD"),
  {
    host: Config.get("DB_HOST"),
    dialect: "mysql",
    logging: false,
  }
);

// Initialize models
export const User = UserModel(sequelize);
export const Task = TaskModel(sequelize);

User.hasMany(Task, { foreignKey: "userId" });
Task.belongsTo(User, { foreignKey: "userId" });

export const syncDatabase = async () => {
  await sequelize.sync({ alter: true });
  console.log("Database synced successfully!");
};

export { sequelize };
