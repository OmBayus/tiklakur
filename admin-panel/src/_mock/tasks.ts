import type { ITaskItem, TaskStatus } from 'src/types/task';

// ----------------------------------------------------------------------

const TASK_STATUS_OPTIONS: TaskStatus[] = ['TODO', 'IN_PROGRESS', 'DONE'];

const TASK_NAMES = [
  'Design System Updates',
  'API Integration',
  'Database Optimization',
  'User Authentication',
  'Mobile App Testing',
  'Performance Monitoring',
  'Security Audit',
  'Code Review',
  'Documentation Update',
  'Bug Fixes',
];

// ----------------------------------------------------------------------

export const tasks: ITaskItem[] = [...Array(10)].map((_, index) => {
  const status = TASK_STATUS_OPTIONS[index % TASK_STATUS_OPTIONS.length];
  const name = TASK_NAMES[index];
  const createdAt = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString();
  const updatedAt = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString();

  return {
    id: index + 1,
    name,
    description: `Description for ${name}`,
    structureID: null,
    status,
    createdAt,
    updatedAt,
    isDeleted: false,
  };
});
