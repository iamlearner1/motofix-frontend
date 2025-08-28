import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import Screen from '../../components/common/Screen';
import AppButton from '../../components/common/AppButton';

const ManagerDashboardScreen = () => {
  const { user, logout } = useAuth();
  return (
    <Screen style={styles.container}>
      <Text style={styles.title}>Manager Dashboard</Text>
      <Text style={styles.welcomeText}>Welcome, {user?.name}!</Text>
      <Text>Use the tabs below to manage your business.</Text>
      <View style={styles.buttonContainer}>
        <AppButton title="Logout" onPress={logout} style={{ backgroundColor: '#6e6969' }} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 40
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    welcomeText: {
        fontSize: 18,
        marginBottom: 20,
    },
    buttonContainer: {
        marginTop: 'auto',
        width: '100%',
        paddingBottom: 20
    },
});

export default ManagerDashboardScreen;