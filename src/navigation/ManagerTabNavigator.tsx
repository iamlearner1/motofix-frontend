import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ManagerDashboardScreen from '../screens/manager/ManagerDashboardScreen';
// We will add more manager screens here later for managing locations, staff, etc.

const Tab = createBottomTabNavigator();

const ManagerTabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerTitleAlign: 'center',
    }}
  >
    <Tab.Screen name="Dashboard" component={ManagerDashboardScreen} />
    {/* Add other tabs like "Manage Staff" and "Locations" here later */}
  </Tab.Navigator>
);

export default ManagerTabNavigator;