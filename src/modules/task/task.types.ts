export interface ITask {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: Date;
  userId: number;
  deletedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITaskFilters {
  status?: 'pending' | 'completed';
  priority?: 'low' | 'medium' | 'high';
  search?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface ITaskCreation extends Omit<
  ITask,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
> {}
