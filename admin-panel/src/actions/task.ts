import type { ITaskItem } from 'src/types/task';

import { useState, useEffect } from 'react';

import { taskService } from 'src/sections/task/services/task';

// ----------------------------------------------------------------------

export function useGetTasks() {
  const [tasks, setTasks] = useState<ITaskItem[]>([]);
  const [tasksLoading, setTasksLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setTasksLoading(true);
        const data = await taskService.getTasks();
        setTasks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
      } finally {
        setTasksLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return {
    tasks,
    tasksLoading,
    error,
  };
}
