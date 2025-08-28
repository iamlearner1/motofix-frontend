import apiClient from '../api/apiClient';
import { PredefinedVehicle } from './vehicleService'; // Reuse the PredefinedVehicle type

// This is the data needed to create a new vehicle model
interface NewVehicleModelPayload {
  brand: string;
  model: string;
}

export const vehicleAdminService = {
  // We can reuse the existing service from vehicleService, but for consistency:
  getPredefinedVehicles: async (): Promise<PredefinedVehicle[]> => {
    const response = await apiClient.get('/vehicles/predefined');
    return response.data.data;
  },

  // Creates a new predefined vehicle model
  createVehicleModel: async (payload: NewVehicleModelPayload): Promise<PredefinedVehicle> => {
    const response = await apiClient.post('/vehicles/predefined', payload);
    return response.data.data;
  },
};