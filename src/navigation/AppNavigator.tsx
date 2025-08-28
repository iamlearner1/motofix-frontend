import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';
import AuthNavigator from './AuthNavigator';
import UserTabNavigator from './UserTabNavigator';
import StaffTabNavigator from './StaffTabNavigator';
import ManagerTabNavigator from './ManagerTabNavigator';

const AppNavigator = () => {
  const { isLoading, token, user } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!token || !user) {
    return <AuthNavigator />;
  }

  switch (user.role.name) {
    case 'staff':
      return <StaffTabNavigator />;
    case 'manager':
      return <ManagerTabNavigator />;
    default:
      return <UserTabNavigator />;
  }
};

export default AppNavigator;