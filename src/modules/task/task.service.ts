import { TaskRepository } from './task.repository';
import { ApiError } from '../../utils/ApiError';
import type { ITaskFilters } from './task.types';

export const TaskService = {
  createTask: async (userId: number, data: any) => {
    return TaskRepository.create({ ...data, userId });
  },

  getTasks: async (userId: number, filters: ITaskFilters) => {
    return TaskRepository.findAll({
      userId,
      status: filters.status,
      priority: filters.priority,
      search: filters.search,
      sortOrder: filters.sortOrder,
    });
  },

  updateTask: async (userId: number, taskId: number, data: any) => {
    const task = await TaskRepository.findById(taskId);
    if (!task || task.userId !== userId) {
      throw ApiError.notFound('Task not found');
    }

    return TaskRepository.update(taskId, data);
  },

  deleteTask: async (userId: number, taskId: number) => {
    const task = await TaskRepository.findById(taskId);
    if (!task || task.userId !== userId) {
      throw ApiError.notFound('Task not found');
    }

    return TaskRepository.softDelete(taskId);
  },
};
