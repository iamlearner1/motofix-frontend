import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StaffBooking } from '../services/staffService'; // Import the type
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// Import the screens
import StaffDashboardScreen from '../screens/staff/StaffDashboardScreen';
import BookingDetailScreen from '../screens/staff/BookingDetailsScreen';
import colors from '../config/colors';

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
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: 'gray',
    }}
  >
    <Tab.Screen
      name="DashboardFlow"
      component={DashboardNavigator}
      options={{
        title: 'Dashboard',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="view-dashboard" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);
export default StaffTabNavigator;