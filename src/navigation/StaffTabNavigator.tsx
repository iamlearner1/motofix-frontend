import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StaffDashboardScreen from '../screens/staff/StaffDashboardScreen';
// We will add more staff screens here later, like a search screen.

const Tab = createBottomTabNavigator();

const StaffTabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerTitleAlign: 'center', // Example of styling the header
    }}
  >
    <Tab.Screen name="Dashboard" component={StaffDashboardScreen} />
    {/* Add other tabs like "Find Booking" here later */}
  </Tab.Navigator>
);

export default StaffTabNavigator;