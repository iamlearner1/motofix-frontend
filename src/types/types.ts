import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Location } from '../services/locationService'; // Make sure to export this type
import { UserVehicle } from '../services/vehicleService';
// 1. Core Data Structures (from our backend)
export type RoleName = 'user' | 'staff' | 'manager';

export interface Role {
  _id: string;
  name: RoleName;
}

export type GarageStackParamList = {
  MyGarage: undefined;
  AddVehicle: undefined;
};

export type HomeStackParamList = {
  UserHome: undefined;
  SelectVehicle: undefined;
  SelectLocation: { vehicleId: string };
  SelectServices: { vehicleId: string; location: Location };
  SelectDateTime: {
    vehicleId: string;
    locationId: string;
    selectedServices: string[];
  };
  ConfirmBooking: { // <-- ADD THIS NEW SCREEN AND ITS PARAMS
    vehicleId: string;
    locationId: string;
    selectedServices: string[];
    slotDate: string;
    slotTime: string;
    // We can pass the full objects for display purposes
    vehicleDetails: UserVehicle; 
    locationDetails: Location;
  };
};
export interface User {
  _id: string;
  name: string;
  email: string;
  role: Role;
  location?: string; // Optional, only for staff
}

// ... We can add other types like Booking, Location etc. here later

// 2. Authentication Context
export interface AuthContextType {
  user: User | null;
  token: string | "token" | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
   updateUser: (newUserData: User) => Promise<void>; // <-- ADD THIS
}

// 3. Navigation
// Defines all the screens in our app
export type RootStackParamList = {
  // Main Navigators
  Auth: undefined;
  UserApp: undefined;
  StaffApp: undefined;
  ManagerApp: undefined;

  // Auth Screens
  Login: undefined;
  Register: undefined;

  // User Tab Navigators
  HomeFlow: undefined; // The entire home tab stack
  GarageFlow: undefined; // The entire garage tab stack

  // Screens within HomeFlow
  UserHome: undefined;
  SelectVehicle: undefined;
  SelectLocation: { vehicleId: string };
  SelectServices: { vehicleId: string; location: Location };
  SelectDateTime: {
    vehicleId: string;
    locationId: string;
    selectedServices: string[];
  };

  // Screens within GarageFlow
  MyGarage: undefined;
  AddVehicle: undefined;
};
// Type prop for a screen, e.g., for the Login screen:
export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type SelectServicesScreenProps = NativeStackScreenProps<RootStackParamList, 'SelectServices'>;
export type SelectDateTimeScreenProps = NativeStackScreenProps<RootStackParamList, 'SelectDateTime'>;