import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthContext';

const ManagerDashboardScreen = () => {
  const { user, logout } = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manager Dashboard</Text>
      <Text style={styles.welcomeText}>Welcome, {user?.name}!</Text>
      <Text>You have administrative privileges.</Text>
      <View style={styles.buttonContainer}>
        <Button title="Logout" onPress={logout} color="#ff6347" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
    marginTop: 30,
    width: '80%',
  },
});

export default ManagerDashboardScreen;