import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserHomeScreen from '../screens/user/UserHomeScreen';
// Import other user screens here later (e.g., MyBookingsScreen)

const Tab = createBottomTabNavigator();

const UserTabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={UserHomeScreen} />
    {/* Add other tabs like "My Bookings" and "Profile" here later */}
  </Tab.Navigator>
);

export default UserTabNavigator;