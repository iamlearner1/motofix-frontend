import apiClient from '../api/apiClient';
import { UserVehicle } from './vehicleService'; // We can reuse types

// Let's define a more detailed Booking type for the staff view
export interface StaffBooking {
  _id: string;
  customer: {
    _id: string;
    name: string;
    email: string;
  };
  vehicle: UserVehicle;
  bookedServices: {
    _id: string;
    name: string;
  }[];
  slotDate: string;
  slotTime: string;
  status: 'Confirmed' | 'In-Progress' | 'Completed' | 'Cancelled';
  issueDescription?: string;
}

export const staffService = {
  // Fetches all bookings for a specific location
  getLocationBookings: async (locationId: string): Promise<StaffBooking[]> => {
    const response = await apiClient.get(`/bookings/location/${locationId}`);
    return response.data.data;
  },

  // We can reuse the bookingService function for updating status, but it's
  // good practice to have it here as well for clarity of staff responsibilities.
  updateBookingStatus: async (bookingId: string, status: StaffBooking['status']): Promise<StaffBooking> => {
    const response = await apiClient.patch(`/bookings/${bookingId}/status`, { status });
    return response.data.data;
  },
};