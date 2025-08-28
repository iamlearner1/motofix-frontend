import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SelectDateTimeScreen from '../screens/user/booking/SelectDateTimeScreen'
// Import all the screens we need for both flows
import UserHomeScreen from '../screens/user/UserHomeScreen';
import SelectLocationScreen from '../screens/user/booking/SelectLocationScreen';
// We will add more booking screens here soon
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileScreen from '../screens/user/ProfileScreen' // <-- IMPORT THE NEW SCREEN
import MyGarageScreen from '../screens/user/garage/MyGarageScreen';
import AddVehicleScreen from '../screens/user/garage/AddVehicleScreen';
import { GarageStackParamList, HomeStackParamList } from '../types/types';
import SelectServicesScreen from '../screens/user/booking/SelectServicesScreen'
import SelectVehicleScreen from '../screens/user/booking/SelectVehicleScreen';
import MyBookingsScreen from '../screens/user/MyBookingsScreen';
import colors from '../config/colors';

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();
import EditProfileScreen from '../screens/user/EditProfileScreen';
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const GarageStack = createNativeStackNavigator<GarageStackParamList>();
const Tab = createBottomTabNavigator();

export type ProfileStackParamList = {
  ProfileView: undefined;
  EditProfile: undefined;
};
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

const ProfileNavigator = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      name="ProfileView"
      component={ProfileScreen}
    />
    <ProfileStack.Screen
      name="EditProfile"
      component={EditProfileScreen}
      options={{ title: 'Edit Profile' }}
    />
  </ProfileStack.Navigator>
);

// --- The Main User Tab Navigator ---
const UserTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: 'gray',
      // Define a function to return the icon component
      tabBarIcon: ({ focused, color, size }) => {
        let iconName = 'home'; // default icon

        if (route.name === 'HomeFlow') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'MyBookings') {
          iconName = focused ? 'calendar-check' : 'calendar-check-outline';
        } else if (route.name === 'GarageFlow') {
          iconName = focused ? 'motorbike' : 'motorbike';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'account' : 'account-outline';
        }
        
        // You can return any component that you like here!
        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="HomeFlow" component={HomeNavigator} options={{ title: 'Home' }} />
    <Tab.Screen name="MyBookings" component={MyBookingsScreen} options={{ title: 'My Bookings', headerShown: true }} />
    <Tab.Screen name="GarageFlow" component={GarageNavigator} options={{ title: 'My Garage' }} />
    <Tab.Screen name="Profile" component={ProfileNavigator} options={{ title: 'Profile', headerShown: false }} />
  </Tab.Navigator>
);
export default UserTabNavigator;