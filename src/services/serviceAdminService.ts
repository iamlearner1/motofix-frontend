import apiClient from '../api/apiClient';
import { Service } from './locationService'; // Reuse the Service type

export const serviceAdminService = {
  getAllServices: async (): Promise<Service[]> => {
    const response = await apiClient.get('/services');
    return response.data.data;
  },
};