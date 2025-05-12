export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

export interface ITaskItem {
  id: number;
  name: string;
  description?: string;
  structureID?: number | null;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

export interface ITaskTableFilters {
  status: TaskStatus[];
}
