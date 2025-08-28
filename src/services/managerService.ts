import apiClient from '../api/apiClient';
import { User } from '../types/types'; // Reuse the main User type

// This is the data needed to create a new staff member
interface NewStaffPayload {
  name: string;
  email: string;
  password: string;
  location: string; // The ID of the location
}

export const managerService = {
  // Fetches all users from the backend
  getAllUsers: async (): Promise<User[]> => {
    const response = await apiClient.get('/users');
    return response.data.data;
  },

  // Creates a new user with the 'staff' role
  createStaffMember: async (payload: NewStaffPayload): Promise<User> => {
    const response = await apiClient.post('/users/staff', payload);
    return response.data.data;
  },
};