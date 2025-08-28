import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StaffBooking } from '../services/staffService';
import colors from '../config/colors';

import StaffDashboardScreen from '../screens/staff/StaffDashboardScreen';
import BookingDetailScreen from '../screens/staff/BookingDetailsScreen';
import StaffProfileScreen from '../screens/staff/StaffProfileScreen';

export type StaffStackParamList = {
  StaffDashboard: undefined;
  BookingDetails: { booking: StaffBooking };
};

const Stack = createNativeStackNavigator<StaffStackParamList>();
const Tab = createBottomTabNavigator();

const DashboardNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name="StaffDashboard" component={StaffDashboardScreen} options={{ title: 'Today\'s Bookings' }} />
        <Stack.Screen name="BookingDetails" component={BookingDetailScreen} options={{ title: 'Booking Details' }} />
    </Stack.Navigator>
);

const StaffTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: 'gray',
      // This function now correctly handles icons for both tabs
      tabBarIcon: ({ focused, color, size }) => {
        let iconName = 'view-dashboard'; // Default icon

        if (route.name === 'DashboardFlow') {
          iconName = focused ? 'view-dashboard' : 'view-dashboard-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'account-circle' : 'account-circle-outline';
        }

        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen
      name="DashboardFlow"
      component={DashboardNavigator}
      options={{ title: 'Dashboard' }}
    />
    <Tab.Screen
      name="Profile"
      component={StaffProfileScreen}
      options={{
        title: 'Profile',
        headerShown: true,
        headerTitleAlign: 'center',
      }}
    />
  </Tab.Navigator>
);

export default StaffTabNavigator;