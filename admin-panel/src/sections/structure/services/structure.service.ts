import axios from 'src/utils/axios';

import type { Floor, Space, Building } from '../types';

const API_URL = 'http://localhost:4002/api/structure/';

type Structure = Building | Floor | Space;

export const structureService = {
  async getBuildings(): Promise<Building[]> {
    const { data } = await axios.get<Building[]>(`${API_URL}getBuildings`);
    return data;
  },

  async getStructure(id: number): Promise<Structure> {
    const { data } = await axios.get<Structure>(`${API_URL}${id}`);
    return data;
  },

  async createStructure(data: Partial<Structure>): Promise<Structure> {
    const { data: response } = await axios.post<Structure>(API_URL, data);
    return response;
  },

  async updateStructure(id: number, data: Partial<Structure>): Promise<Structure> {
    const { data: response } = await axios.put<Structure>(`${API_URL}${id}`, data);
    return response;
  },

  async deleteStructure(id: number): Promise<void> {
    await axios.delete(`${API_URL}${id}`);
  },
};
