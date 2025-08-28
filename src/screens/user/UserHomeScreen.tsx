import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import AppButton from '../../components/common/AppButton';
import Screen from '../../components/common/Screen';

const UserHomeScreen = ({ navigation }: any) => {
  const { user, logout } = useAuth();
  return (
    <Screen style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome, {user?.name}!</Text>
        <Text style={styles.subText}>Ready to get your vehicle serviced?</Text>
      </View>
      <AppButton
        title="Book a New Service"
        onPress={() => navigation.navigate('SelectLocation')}
      />
      <View style={{ marginTop: 'auto', marginBottom: 20 }}>
        <AppButton title="Logout" onPress={logout} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 16,
    color: '#6e6969',
    marginTop: 8,
  },
});

export default UserHomeScreen;