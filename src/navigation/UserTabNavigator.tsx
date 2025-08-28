import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import UserHomeScreen from '../screens/user/UserHomeScreen';
import MyGarageScreen from '../screens/user/garage/MyGarageScreen';
import AddVehicleScreen from '../screens/user/garage/AddVehicleScreen';
import { GarageStackParamList } from '../types/types';

// Define the screens within the "Garage" stack


const Stack = createNativeStackNavigator<GarageStackParamList>();
const Tab = createBottomTabNavigator();

// Create a new component for the Garage flow
const GarageNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MyGarage" component={MyGarageScreen} />
     <Stack.Screen name="AddVehicle" component={AddVehicleScreen} /> 
  </Stack.Navigator>
);

const UserTabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={UserHomeScreen} />
    {/* The "Garage" tab now points to its own stack navigator */}
    <Tab.Screen
      name="Garage"
      component={GarageNavigator}
      options={{ title: 'My Garage', headerShown: false }}
    />
    {/* Add "My Bookings" and "Profile" tabs here later */}
  </Tab.Navigator>
);

export default UserTabNavigator;