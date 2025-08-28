import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { staffService, StaffBooking } from '../../services/staffService';

import Screen from '../../components/common/Screen';
import Card from '../../components/common/Card';
import AppButton from '../../components/common/AppButton';
import colors from '../../config/colors';

const StaffDashboardScreen = () => {
  const { user, logout } = useAuth();
  const [bookings, setBookings] = useState<StaffBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBookings = async () => {
    if (!user?.location) {
      setError("Your account is not assigned to a location.");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const data = await staffService.getLocationBookings(user.location);
      setBookings(data);
    } catch (err) {
      setError("Failed to load bookings.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(useCallback(() => { loadBookings(); }, [user]));

  const handleStatusUpdate = async (bookingId: string, newStatus: StaffBooking['status']) => {
    try {
      // Optimistic UI update: update the state immediately
      setBookings(currentBookings =>
        currentBookings.map(b => (b._id === bookingId ? { ...b, status: newStatus } : b))
      );
      // Then make the API call
      await staffService.updateBookingStatus(bookingId, newStatus);
    } catch (error) {
      Alert.alert("Error", "Failed to update status. Please try again.");
      // Revert the UI update on failure
      loadBookings();
    }
  };
  
  const renderBookingCard = ({ item }: { item: StaffBooking }) => (
    <Card
      title={`${item.vehicle.vehicleInfo.brand} ${item.vehicle.vehicleInfo.model}`}
      subTitle={item.vehicle.registrationNumber}
    >
      <View style={styles.cardContent}>
        <Text style={styles.detailText}>Customer: {item.customer.name}</Text>
        <Text style={styles.detailText}>Date: {new Date(item.slotDate).toLocaleDateString()} at {item.slotTime}</Text>
        <Text style={styles.statusText}>Status: {item.status}</Text>
        <View style={styles.buttonGroup}>
          {item.status === 'Confirmed' && (
            <AppButton title="Start Service" onPress={() => handleStatusUpdate(item._id, 'In-Progress')} />
          )}
          {item.status === 'In-Progress' && (
            <AppButton title="Mark as Completed" onPress={() => handleStatusUpdate(item._id, 'Completed')} />
          )}
        </View>
      </View>
    </Card>
  );

  return (
    <Screen style={styles.container}>
      <Text style={styles.title}>Bookings for your location</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item._id}
          renderItem={renderBookingCard}
          ListEmptyComponent={<Text style={styles.emptyText}>No bookings found for your location.</Text>}
        />
      )}
      <AppButton title="Logout" onPress={logout} style={{ backgroundColor: colors.medium }}/>
    </Screen>
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
  errorText: { color: colors.danger, textAlign: 'center' },
  emptyText: { color: colors.medium, textAlign: 'center', marginTop: 50 },
  cardContent: { paddingTop: 15, marginTop: 15, borderTopWidth: 1, borderTopColor: colors.light },
  detailText: { fontSize: 16, marginBottom: 5 },
  statusText: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  buttonGroup: { marginTop: 10 },
});

export default StaffDashboardScreen;