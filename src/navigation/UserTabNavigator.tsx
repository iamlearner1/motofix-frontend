import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SelectDateTimeScreen from '../screens/user/booking/SelectDateTimeScreen'
// Import all the screens we need for both flows
import UserHomeScreen from '../screens/user/UserHomeScreen';
import SelectLocationScreen from '../screens/user/booking/SelectLocationScreen';
// We will add more booking screens here soon
import ProfileScreen from '../screens/user/ProfileScreen' // <-- IMPORT THE NEW SCREEN
import MyGarageScreen from '../screens/user/garage/MyGarageScreen';
import AddVehicleScreen from '../screens/user/garage/AddVehicleScreen';
import { GarageStackParamList, HomeStackParamList } from '../types/types';
import SelectServicesScreen from '../screens/user/booking/SelectServicesScreen'
import SelectVehicleScreen from '../screens/user/booking/SelectVehicleScreen';
import MyBookingsScreen from '../screens/user/MyBookingsScreen';


const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const GarageStack = createNativeStackNavigator<GarageStackParamList>();
const Tab = createBottomTabNavigator();

// This component manages the screens for the booking flow
const HomeNavigator = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen 
      name="UserHome" 
      component={UserHomeScreen} 
      options={{ title: 'Welcome' }} 
    />
        <HomeStack.Screen
      name="SelectVehicle" // <-- ADD THIS SCREEN
      component={SelectVehicleScreen}
      options={{ title: 'Select Your Vehicle' }}
    />
    <HomeStack.Screen
      name="SelectLocation"
      component={SelectLocationScreen}
      options={{ title: 'Select a Service Center' }}
    />
    {/* ADD THE NEW SCREEN */}
    <HomeStack.Screen
      name="SelectServices"
      component={SelectServicesScreen}
      options={{ title: 'Choose Services' }}
    />
       <HomeStack.Screen
      name="SelectDateTime"
      component={SelectDateTimeScreen}
      options={{ title: 'Pick a Date & Time' }}
    />
  </HomeStack.Navigator>
);

// This component manages the screens for the "My Garage" feature
const GarageNavigator = () => (
  <GarageStack.Navigator>
    <GarageStack.Screen 
      name="MyGarage" 
      component={MyGarageScreen} 
      options={{ title: 'My Garage' }} 
    />
    <GarageStack.Screen 
      name="AddVehicle" 
      component={AddVehicleScreen} 
      options={{ title: 'Add a New Vehicle' }} 
    />
  </GarageStack.Navigator>
);


// --- The Main User Tab Navigator ---

const UserTabNavigator = () => (
  <Tab.Navigator screenOptions={{ 
      // Hide the header for the tab navigator itself, as each stack has its own header
      headerShown: false 
    }}>
    <Tab.Screen 
      name="HomeFlow" // Use a different name for the route
      component={HomeNavigator} 
      options={{ title: 'Home' }} // This is the label on the tab button
    />
    <Tab.Screen 
      name="GarageFlow" // Use a different name for the route
      component={GarageNavigator} 
      options={{ title: 'My Garage' }} // This is the label on the tab button
    />
      <Tab.Screen 
      name="MyBookings" 
      component={MyBookingsScreen} 
      options={{ 
        title: 'My Bookings',
        headerShown: true, // Show a header for this simple screen
        headerTitleAlign: 'center',
      }} 
    />
     <Tab.Screen 
      name="Profile" 
      component={ProfileScreen} 
      options={{ 
        title: 'Profile',
        headerShown: true, // Let's give this screen a simple header
        headerTitleAlign: 'center',
      }} 
    />
    {/* Add "My Bookings" and "Profile" tabs here later */}
  </Tab.Navigator>
);

export default UserTabNavigator;