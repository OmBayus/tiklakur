import type { ITaskItem } from 'src/types/task';

import axios from 'src/utils/axios';

const API_URL = 'http://localhost:4003/api';

export const taskService = {
  getTasks: async (): Promise<ITaskItem[]> => {
    const response = await axios.get(`${API_URL}/task/`);
    return response.data;
  },

  createTask: async (task: { name: string; description: string }): Promise<ITaskItem> => {
    const response = await axios.post(`${API_URL}/task/`, task);
    return response.data;
  },

  deleteTask: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/task/${id}`);
  },

  updateTask: async (id: number, task: Partial<ITaskItem>): Promise<ITaskItem> => {
    const response = await axios.put(`${API_URL}/task/${id}`, task);
    return response.data;
  },
};
