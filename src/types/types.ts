import { NativeStackScreenProps } from '@react-navigation/native-stack';

// 1. Core Data Structures (from our backend)
export type RoleName = 'user' | 'staff' | 'manager';

export interface Role {
  _id: string;
  name: RoleName;
}

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
}

// 3. Navigation
// Defines all the screens in our app
export type RootStackParamList = {
  // Navigators
  Auth: undefined;
  UserApp: undefined;
  StaffApp: undefined;
  ManagerApp: undefined;

  // Screens
  Login: undefined;
  Register: undefined;
};

// Type prop for a screen, e.g., for the Login screen:
export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;