import { DataTypes, Sequelize, Model } from "sequelize";
import { ITask, ITaskCreation } from "../modules/task/task.types";

export interface TaskInstance
  extends Model<ITask, ITaskCreation>,
    ITask {}

export const TaskModel = (sequelize: Sequelize) => {
  const Task = sequelize.define<TaskInstance>(
    "Task",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      status: {
        type: DataTypes.ENUM("pending", "in-progress", "completed"),
        defaultValue: "pending",
      },
      priority: {
        type: DataTypes.ENUM("low", "medium", "high"),
        defaultValue: "medium",
      },
      dueDate: { type: DataTypes.DATE, allowNull: false },
      userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
      deletedAt: { type: DataTypes.DATE, allowNull: true },
    },
    {
      tableName: "tasks",
      paranoid: true,
      timestamps: true,
    }
  );

  return Task;
};
