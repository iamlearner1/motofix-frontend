import apiClient from '../api/apiClient';
import { User } from '../types/types';

interface LoginResponse {
  accessToken: string;
  user: User;
}

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data.data;
  },

  register: async (name: string, email: string, password: string): Promise<User> => {
    const response = await apiClient.post('/auth/register', { name, email, password });
    return response.data.data;
  },
};