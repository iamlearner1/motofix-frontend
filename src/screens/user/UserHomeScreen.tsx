import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { bookingService } from '../../services/bookingService';

import Screen from '../../components/common/Screen';
import AppButton from '../../components/common/AppButton';
import colors from '../../config/colors'; // Make sure to import colors
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// A reusable StatCard component, similar to the manager's dashboard
const StatCard = ({ icon, label, count, color }: { icon: string, label: string, count: number, color: string }) => (
  <View style={styles.statCard}>
    <MaterialCommunityIcons name={icon} size={30} color={color} />
    <Text style={styles.statCount}>{count}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const UserHomeScreen = ({ navigation }: any) => {
  const { user, logout } = useAuth();

  // State for the booking stats
  const [totalBookings, setTotalBookings] = useState(0);
  const [pendingBookings, setPendingBookings] = useState(0);
  const [completedBookings, setCompletedBookings] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Function to load the user's booking history and calculate stats
  const loadBookingStats = async () => {
    try {
      setIsLoading(true);
      const history = await bookingService.getUserHistory();
      
      const pending = history.filter(b => b.status === 'Confirmed' || b.status === 'In-Progress');
      const completed = history.filter(b => b.status === 'Completed');

      setTotalBookings(history.length);
      setPendingBookings(pending.length);
      setCompletedBookings(completed.length);
    } catch (error) {
      console.error("Failed to load user booking stats", error);
      // Set defaults on error
      setTotalBookings(0);
      setPendingBookings(0);
      setCompletedBookings(0);
    } finally {
      setIsLoading(false);
    }
  };

  // useFocusEffect will refetch the stats every time the user comes back to the home screen
  useFocusEffect(
    useCallback(() => {
      loadBookingStats();
    }, [])
  );

  return (
    <Screen style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome, {user?.name}!</Text>
        <Text style={styles.subText}>Here is your service summary:</Text>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color={colors.primary} style={{ height: 120 }}/>
      ) : (
        <View style={styles.statsContainer}>
          <StatCard icon="calendar-multiple" label="Total Bookings" count={totalBookings} color="#3498db" />
          <StatCard icon="calendar-clock" label="Pending" count={pendingBookings} color="#e67e22" />
          <StatCard icon="calendar-check" label="Completed" count={completedBookings} color="#2ecc71" />
        </View>
      )}

      <AppButton
        title="Book a New Service"
        onPress={() => navigation.navigate('SelectVehicle')}
      />
      <View style={styles.logoutButtonContainer}>
        <AppButton title="Logout" onPress={logout} style={{ backgroundColor: colors.medium }}/>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40,
    backgroundColor: colors.light,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.dark,
  },
  subText: {
    fontSize: 16,
    color: colors.medium,
    marginTop: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 30, // Add some space before the main button
  },
  statCard: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    width: '31%', // To fit 3 cards in a row
  },
  statCount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.dark,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.medium,
    marginTop: 3,
  },
  logoutButtonContainer: {
    marginTop: 'auto',
    width: '100%',
    paddingBottom: 20
  },
});

export default UserHomeScreen;