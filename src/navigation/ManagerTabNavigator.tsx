import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import the screens the Manager will use
import ManagerDashboardScreen from '../screens/manager/ManagerDashboardScreen';
import ManageStaffScreen from '../screens/manager/ManageStaffScreen';
import AddStaffScreen from '../screens/manager/AddStaffScreen';
import ManageLocationsScreen from '../screens/manager/ManageLocationsScreen'; // <-- NEW
import AddLocationScreen from '../screens/manager/AddLocationScreen';     // <-- NEW
// Define the screens within the "Manage Staff" stack
export type StaffManagementStackParamList = {
  StaffList: undefined;
  AddStaff: undefined;
};

export type LocationManagementStackParamList = {
  LocationList: undefined;
  AddLocation: undefined;
};

const Stack = createNativeStackNavigator<StaffManagementStackParamList>();
const LocationStack = createNativeStackNavigator<LocationManagementStackParamList>(); // <-- NEW STACK
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

const LocationManagementNavigator = () => (
  <LocationStack.Navigator>
    <LocationStack.Screen 
      name="LocationList" 
      component={ManageLocationsScreen} 
      options={{ title: 'All Service Locations' }} 
    />
    <LocationStack.Screen 
      name="AddLocation" 
      component={AddLocationScreen} 
      options={{ title: 'Add New Location' }} 
    />
  </LocationStack.Navigator>
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
      <Tab.Screen
      name="ManageLocationsFlow"
      component={LocationManagementNavigator}
      options={{ title: 'Manage Locations' }}
    />
    {/* We can add more tabs here later, like "Manage Locations" */}
  </Tab.Navigator>
);

export default ManagerTabNavigator;