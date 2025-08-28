import apiClient from '../api/apiClient';

// Add these new types
export interface Booking {
  _id: string;
  // ... other booking properties
}

export interface NewBookingData {
  vehicle: string;
  location: string;
  bookedServices: string[];
  slotDate: string; // YYYY-MM-DD format
  slotTime: string; // HH:mm format
  issueDescription?: string;
}

export const bookingService = {
  // Create a new booking
  createBooking: async (bookingData: NewBookingData): Promise<Booking> => {
    const response = await apiClient.post('/bookings', bookingData);
    return response.data.data;
  },

  // ... keep the existing getUserHistory function
  getUserHistory: async (): Promise<any[]> => { // Replace 'any' with a proper Booking type later
    const response = await apiClient.get('/bookings');
    return response.data.data;
  },
};