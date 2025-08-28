import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import all the manager screens that will be part of the new unified stack
import ManagerDashboardScreen from '../screens/manager/ManagerDashboardScreen';
import ManagementMenuScreen from '../screens/manager/ManagementMenuScreen';
import ManageStaffScreen from '../screens/manager/ManageStaffScreen';
import AddStaffScreen from '../screens/manager/AddStaffScreen';
import ManageLocationsScreen from '../screens/manager/ManageLocationsScreen';
import AddLocationScreen from '../screens/manager/AddLocationScreen';
import ManageServicesScreen from '../screens/manager/ManageServicesScreen';
import AddServiceScreen from '../screens/manager/AddServiceScreen';
import AddVehicleModelScreen from '../screens/manager/AddVehicleModelScreen';
import ManageVehicleModelsScreen from '../screens/manager/ManageVehicleModelsScreen';
// import ManageVehicleModelsScreen from '../screens/manager/ManageVehicleModelsScreen';
// import AddVehicleModelScreen from '../screens/manager/AddVehicleModelScreen';

// 1. Create ONE consolidated Stack Param List for all management screens
export type ManagementStackParamList = {
  ManagementMenu: undefined;
  StaffList: undefined;
  AddStaff: undefined;
  LocationList: undefined;
  AddLocation: undefined;
  ServiceList: undefined;
  AddService: undefined;
  VehicleModelList: undefined;
  AddVehicleModel: undefined;
};

// 2. Create the navigator instances
const Stack = createNativeStackNavigator<ManagementStackParamList>();
const Tab = createBottomTabNavigator();

// 3. Create ONE powerful Stack Navigator for the "Manage" tab
const ManagementNavigator = () => (
  <Stack.Navigator>
    {/* The first screen is our new menu */}
    <Stack.Screen 
      name="ManagementMenu" 
      component={ManagementMenuScreen}
      options={{ title: 'Management Hub' }}
    />
    {/* All other management screens are defined here */}
    <Stack.Screen name="StaffList" component={ManageStaffScreen} options={{ title: 'All Staff' }} />
    <Stack.Screen name="AddStaff" component={AddStaffScreen} options={{ title: 'Add New Staff' }} />
    <Stack.Screen name="LocationList" component={ManageLocationsScreen} options={{ title: 'All Locations' }} />
    <Stack.Screen name="AddLocation" component={AddLocationScreen} options={{ title: 'Add New Location' }} />
    <Stack.Screen name="ServiceList" component={ManageServicesScreen} options={{ title: 'All Services' }} />
    <Stack.Screen name="AddService" component={AddServiceScreen} options={{ title: 'Add New Service' }} />
    <Stack.Screen name="VehicleModelList" component={ManageVehicleModelsScreen} options={{ title: 'All Vehicle Models' }} />
    <Stack.Screen name="AddVehicleModel" component={AddVehicleModelScreen} options={{ title: 'Add New Model' }} />
  </Stack.Navigator>
);

// 4. Create the final, clean Tab Navigator
const ManagerTabNavigator = () => (
  <Tab.Navigator screenOptions={{ 
      headerShown: false,
      // You can add tab bar styling here if you like
      // tabBarActiveTintColor: colors.primary,
    }}>
    <Tab.Screen 
      name="Dashboard" 
      component={ManagerDashboardScreen} 
    />
    <Tab.Screen
      name="ManageFlow"
      component={ManagementNavigator} // The "Manage" tab now points to our big stack
      options={{ title: 'Manage' }}    // This is the clean label on the tab button
    />
  </Tab.Navigator>
);

export default ManagerTabNavigator;