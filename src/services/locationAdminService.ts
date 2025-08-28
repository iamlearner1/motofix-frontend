import apiClient from '../api/apiClient';
import { Location } from './locationService'; // Reuse the Location type

// This is the data needed to create a new location
interface NewLocationPayload {
  name: string;
  address: string;
  openingTime: string; // "HH:mm" format
  closingTime: string; // "HH:mm" format
  slotDurationMinutes: number;
  offeredServices: string[]; // Array of service IDs
}

export const locationAdminService = {
  // We can reuse the existing service, but for consistency in the admin flow:
  getAllLocations: async (): Promise<Location[]> => {
    const response = await apiClient.get('/locations');
    return response.data.data;
  },

  // Creates a new location
  createLocation: async (payload: NewLocationPayload): Promise<Location> => {
    const response = await apiClient.post('/locations', payload);
    return response.data.data;
  },
};

export { Location };
