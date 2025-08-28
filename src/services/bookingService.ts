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

export interface UserBooking {
  _id: string;
  vehicle: {
    _id: string;
    registrationNumber: string;
  };
  location: {
    _id:string;
    name: string;
  };
  bookedServices: {
    _id: string;
    name: string;
  }[];
  slotDate: string;
  slotTime: string;
  status: 'Confirmed' | 'In-Progress' | 'Completed' | 'Cancelled';
   issueDescription?: string; // <-- ADD THIS LINE
}


export const bookingService = {
  // Create a new booking
  createBooking: async (bookingData: NewBookingData): Promise<Booking> => {
    const response = await apiClient.post('/bookings', bookingData);
    console.log(response);
    
    return response.data.data;
  },

  // ... keep the existing getUserHistory function
  getUserHistory: async (): Promise<UserBooking[]> => {
    const response = await apiClient.get('/bookings');
    return response.data.data;
  },

};