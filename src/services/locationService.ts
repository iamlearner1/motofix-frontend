import apiClient from '../api/apiClient';

// Add these new types
export interface Service {
  _id: string;
  name: string;
  description: string;
}

export interface Location {
  _id: string;
  name: string;
  address: string;
  offeredServices: Service[]; // Now populated with full service objects
}

export const locationService = {
  // Fetches all locations, now with their offered services populated
  getAllLocations: async (): Promise<Location[]> => {
    const response = await apiClient.get('/locations');
    return response.data.data;
  },
  
  // Fetches available time slots for a specific location and date
  getAvailableSlots: async (locationId: string, date: string): Promise<string[]> => {
    // The date should be in YYYY-MM-DD format
    const response = await apiClient.get(`/locations/slots?locationId=${locationId}&date=${date}`);
    return response.data.data.availableSlots;
  },
};