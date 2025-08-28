import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import the screens the Manager will use
import ManagerDashboardScreen from '../screens/manager/ManagerDashboardScreen';
import ManageStaffScreen from '../screens/manager/ManageStaffScreen';
import AddStaffScreen from '../screens/manager/AddStaffScreen';

// Define the screens within the "Manage Staff" stack
export type StaffManagementStackParamList = {
  StaffList: undefined;
  AddStaff: undefined;
};

const Stack = createNativeStackNavigator<StaffManagementStackParamList>();
const Tab = createBottomTabNavigator();

// Create a StackNavigator for the Staff Management flow
// This allows navigating from the list of staff to the "add staff" form
const StaffManagementNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="StaffList" 
      component={ManageStaffScreen} 
      options={{ title: 'All Staff Members' }} 
    />
    <Stack.Screen 
      name="AddStaff" 
      component={AddStaffScreen} 
      options={{ title: 'Add New Staff' }} 
    />
  </Stack.Navigator>
);

// This is the main Tab Navigator for the Manager role
const ManagerTabNavigator = () => (
  <Tab.Navigator screenOptions={{ 
      // We hide the header for the tabs because each stack has its own header
      headerShown: false 
    }}>
    <Tab.Screen 
      name="Dashboard" 
      component={ManagerDashboardScreen} 
    />
    <Tab.Screen
      name="ManageStaffFlow"
      component={StaffManagementNavigator}
      options={{ title: 'Manage Staff' }} // This is the text on the tab button
    />
    {/* We can add more tabs here later, like "Manage Locations" */}
  </Tab.Navigator>
);

export default ManagerTabNavigator;