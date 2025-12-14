import { Router } from 'express';
import { TaskController } from '../modules/task/task.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import {
  createTaskSchema,
  updateTaskSchema,
} from '../validators/task.validator';

const router = Router();

router.post(
  '/',
  authMiddleware,
  validate(createTaskSchema),
  TaskController.create
);
router.get('/', authMiddleware, TaskController.getAll);
router.put(
  '/:id',
  authMiddleware,
  validate(updateTaskSchema),
  TaskController.update
);
router.delete('/:id', authMiddleware, TaskController.delete);

export default router;
