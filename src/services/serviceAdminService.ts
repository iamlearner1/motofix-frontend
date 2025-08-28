import apiClient from '../api/apiClient';
import { Service } from './locationService'; // Reuse the Service type
interface NewServicePayload {
  name: string;
  description: string;
}
export const serviceAdminService = {
  getAllServices: async (): Promise<Service[]> => {
    const response = await apiClient.get('/services');
    return response.data.data;
  },
    createService: async (payload: NewServicePayload): Promise<Service> => {
    const response = await apiClient.post('/services', payload);
    return response.data.data;
  },
};