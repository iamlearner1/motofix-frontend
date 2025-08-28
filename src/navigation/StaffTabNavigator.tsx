import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StaffBooking } from '../services/staffService'; // Import the type

// Import the screens
import StaffDashboardScreen from '../screens/staff/StaffDashboardScreen';
import BookingDetailScreen from '../screens/staff/BookingDetailsScreen';

// Define the screens and their params within this stack
export type StaffStackParamList = {
  StaffDashboard: undefined;
  BookingDetails: { booking: StaffBooking }; // Pass the entire booking object
};

const Stack = createNativeStackNavigator<StaffStackParamList>();
const Tab = createBottomTabNavigator();

// Create a new component for the Dashboard flow
const DashboardNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="StaffDashboard"
      component={StaffDashboardScreen}
      options={{ title: 'Today\'s Bookings' }}
    />
    <Stack.Screen
      name="BookingDetails"
      component={BookingDetailScreen}
      options={{ title: 'Booking Details' }}
    />
  </Stack.Navigator>
);

const StaffTabNavigator = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen
      name="DashboardFlow"
      component={DashboardNavigator}
      options={{ title: 'Dashboard' }}
    />
    {/* Add other staff tabs like "Find Booking" here later */}
  </Tab.Navigator>
);

export default StaffTabNavigator;