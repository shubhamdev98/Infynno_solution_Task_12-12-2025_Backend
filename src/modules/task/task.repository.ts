import { Task } from "../../config/database";
import { Op } from "sequelize";

interface FindAllFilters {
  userId: number;
  status?: string;
  priority?: string;
  search?: string;
  sortOrder?: "ASC" | "DESC";
}
export const TaskRepository = {
  create: (data: any) => Task.create(data),

   findAll: (filters: FindAllFilters) => {
    const where: any = {
      userId: filters.userId,
    };

    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.priority) {
      where.priority = filters.priority;
    }

    if (filters.search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${filters.search}%` } },
        { description: { [Op.like]: `%${filters.search}%` } },
      ];
    }

    const sortOrder = filters.sortOrder || "DESC";

    return Task.findAll({
      where,
      order: [["createdAt", sortOrder]],
    });
  },

  findById: (id: number) =>
    Task.findOne({ where: { id } }),

  update: (id: number, data: any) =>
    Task.update(data, { where: { id } }),

  softDelete: (id: number) =>
    Task.destroy({ where: { id } }),
};
