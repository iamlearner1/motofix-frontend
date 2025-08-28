import apiClient from '../api/apiClient';

// Define types for clarity
export interface PredefinedVehicle {
  _id: string;
  brand: string;
  model: string;
}

export interface UserVehicle {
  _id: string;
  owner: string;
  vehicleInfo: PredefinedVehicle;
  registrationNumber: string;
}

interface AddVehiclePayload {
  predefinedVehicleId: string;
  registrationNumber: string;
}

export const vehicleService = {
  // Fetches the master list of all brands/models
  getPredefinedVehicles: async (): Promise<PredefinedVehicle[]> => {
    const response = await apiClient.get('/vehicles/predefined');
    return response.data.data;
  },

  // Fetches only the vehicles belonging to the logged-in user
  getUserVehicles: async (): Promise<UserVehicle[]> => {
    const response = await apiClient.get('/vehicles');
    return response.data.data;
  },

  // Adds a new vehicle to the user's garage
  addUserVehicle: async (payload: AddVehiclePayload): Promise<UserVehicle> => {
    const response = await apiClient.post('/vehicles', payload);
    return response.data.data;
  },
};