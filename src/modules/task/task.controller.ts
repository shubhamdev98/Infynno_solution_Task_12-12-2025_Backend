import { Request, Response } from 'express';
import { TaskService } from './task.service';
import { AsyncHandler } from '../../utils/AsyncHandler';
import { successResponse } from '../../constant/response';

export const TaskController = {
  create: AsyncHandler.handle(async (req: Request, res: Response) => {
    const userId = req.user.id;
    const task = await TaskService.createTask(userId, req.body);
    res.status(201).json(successResponse(task, 'Task created'));
  }),

  getAll: AsyncHandler.handle(async (req: Request, res: Response) => {
    const userId = req.user.id;
    const tasks = await TaskService.getTasks(userId, req.query);
    res.json(successResponse(tasks, 'Tasks fetched'));
  }),

  update: AsyncHandler.handle(async (req: Request, res: Response) => {
    const userId = req.user.id;
    await TaskService.updateTask(userId, Number(req.params.id), req.body);
    res.json(successResponse(null, 'Task updated'));
  }),

  delete: AsyncHandler.handle(async (req: Request, res: Response) => {
    const userId = req.user.id;
    await TaskService.deleteTask(userId, Number(req.params.id));
    res.json(successResponse(null, 'Task deleted'));
  }),
};
