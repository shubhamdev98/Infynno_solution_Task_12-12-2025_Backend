import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(5, 'Description must be at least 5 characters'),
  status: z.enum(['pending', 'in-progress', 'completed']),
  priority: z.enum(['low', 'medium', 'high']),
  dueDate: z
    .string()
    .datetime()
    .refine((date) => new Date(date) > new Date(), {
      message: 'Due date must be in the future',
    }),
});

export const updateTaskSchema = createTaskSchema;
