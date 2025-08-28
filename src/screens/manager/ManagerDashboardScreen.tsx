// --- THIS IS THE CORRECTED IMPORT LINE ---
import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { managerService } from '../../services/managerService';
import { locationAdminService } from '../../services/locationAdminService';
import { serviceAdminService } from '../../services/serviceAdminService';

import Screen from '../../components/common/Screen';
import AppButton from '../../components/common/AppButton';
import colors from '../../config/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// The StatCard component is correct and does not need changes
const StatCard = ({ icon, label, count, color }: { icon: string, label: string, count: number, color: string }) => (
  <View style={styles.statCard}>
    <MaterialCommunityIcons name={icon} size={40} color={color} />
    <Text style={styles.statCount}>{count}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const ManagerDashboardScreen = () => {
  const { user, logout } = useAuth();
  
  const [staffCount, setStaffCount] = useState(0);
  const [locationCount, setLocationCount] = useState(0);
  const [serviceCount, setServiceCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      const [allUsers, allLocations, allServices, allBookings] = await Promise.all([
        managerService.getAllUsers(),
        locationAdminService.getAllLocations(),
        serviceAdminService.getAllServices(),
        managerService.getAllBookings(),
      ]);

      const staffMembers = allUsers.filter(u => u.role.name === 'staff');
      setStaffCount(staffMembers.length);
      setLocationCount(allLocations.length);
      setServiceCount(allServices.length);
      setBookingCount(allBookings.length);

    } catch (error) {
      console.error("Failed to load dashboard data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(useCallback(() => { loadDashboardData(); }, []));

  return (
    <Screen style={styles.container}>
      <Text style={styles.title}>Manager Dashboard</Text>
      <Text style={styles.welcomeText}>Welcome, {user?.name}!</Text>

      {isLoading ? (
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 50 }}/>
      ) : (
        <View style={styles.statsContainer}>
          <StatCard icon="account-group" label="Total Staff" count={staffCount} color="#3498db" />
          <StatCard icon="map-marker-radius" label="Locations" count={locationCount} color="#e67e22" />
          <StatCard icon="cogs" label="Services" count={serviceCount} color="#9b59b6" />
          <StatCard icon="calendar-check" label="Bookings" count={bookingCount} color="#2ecc71" />
        </View>
      )}

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
        paddingTop: 40,
        backgroundColor: colors.light,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    welcomeText: {
        fontSize: 18,
        color: colors.medium,
        marginBottom: 30,
    },
    statsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      width: '100%',
      paddingHorizontal: 20,
    },
    // --- UPDATED STYLES FOR THE STAT CARD ---
    statCard: {
      backgroundColor: colors.white,
      borderRadius: 15,
      paddingVertical: 15, // <-- REDUCED from 20
      paddingHorizontal: 5, // <-- REDUCED from 10
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      width: '48%',
      marginBottom: 15,
    },
    statCount: {
      fontSize: 32, // <-- REDUCED from 36
      fontWeight: 'bold',
      color: colors.dark,
      marginTop: 8, // <-- REDUCED from 10
    },
    statLabel: {
      fontSize: 13, // <-- REDUCED from 14
      color: colors.medium,
      marginTop: 3, // <-- REDUCED from 5
      textAlign: 'center',
    },
    buttonContainer: {
        marginTop: 'auto',
        width: '100%',
        padding: 20,
    },
});
export default ManagerDashboardScreen;