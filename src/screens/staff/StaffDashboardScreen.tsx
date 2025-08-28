import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { staffService, StaffBooking } from '../../services/staffService';

import Screen from '../../components/common/Screen';
import Card from '../../components/common/Card';
import AppButton from '../../components/common/AppButton';
import Pill from '../../components/common/Pill'; // <-- IMPORT THE NEW COMPONENT
import colors from '../../config/colors';
import { formatDisplayDate } from '../../utils/dateUtils';

// Define the possible filter states
type FilterStatus = 'Upcoming' | 'Completed' | 'All';

const StaffDashboardScreen = ({ navigation }: any) => {
  const { user, logout } = useAuth();
  const [allBookings, setAllBookings] = useState<StaffBooking[]>([]); // <-- Store all bookings
  const [activeFilter, setActiveFilter] = useState<FilterStatus>('Upcoming'); // <-- Filter state
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
      // Sort bookings by date initially
      const sortedData = data.sort((a, b) => new Date(b.slotDate).getTime() - new Date(a.slotDate).getTime());
      setAllBookings(sortedData);
    } catch (err) {
      setError("Failed to load bookings.");
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(useCallback(() => { loadBookings(); }, [user]));

  // --- FILTERING LOGIC ---
  // useMemo ensures this calculation only runs when the filter or bookings change
  const filteredBookings = useMemo(() => {
    if (activeFilter === 'Upcoming') {
      return allBookings.filter(b => b.status === 'Confirmed' || b.status === 'In-Progress');
    }
    if (activeFilter === 'Completed') {
      return allBookings.filter(b => b.status === 'Completed' || b.status === 'Cancelled');
    }
    return allBookings; // "All" filter
  }, [allBookings, activeFilter]);

  const handleStatusUpdate = async (bookingId: string, newStatus: StaffBooking['status']) => {
    try {
      setAllBookings(currentBookings =>
        currentBookings.map(b => (b._id === bookingId ? { ...b, status: newStatus } : b))
      );
      await staffService.updateBookingStatus(bookingId, newStatus);
    } catch (error) {
      Alert.alert("Error", "Failed to update status. Please try again.");
      loadBookings();
    }
  };

  const renderBookingCard = ({ item }: { item: StaffBooking }) => (
    // ... same as before
    <TouchableOpacity onPress={() => navigation.navigate('BookingDetails', { booking: item })}>
       <Card
        title={`${item.vehicle.vehicleInfo.brand} ${item.vehicle.vehicleInfo.model}`}
        subTitle={item.vehicle.registrationNumber}
      >
        <View style={styles.cardContent}>
          <Text style={styles.detailText}>Customer: {item.customer.name}</Text>
          <Text style={styles.dateText}>Date: {formatDisplayDate(item.slotDate)} at {item.slotTime}</Text>
          <View style={[styles.statusContainer, { backgroundColor: item.status === 'Completed' ? colors.medium : colors.secondary }]}>
            <Text style={styles.statusText}>Status: {item.status}</Text>
          </View>
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
    </TouchableOpacity>
  );

  return (
    <Screen style={styles.container}>
      {/* --- ADD THE FILTER COMPONENT UI HERE --- */}
      <View style={styles.filterContainer}>
        <Pill label="Upcoming" isActive={activeFilter === 'Upcoming'} onPress={() => setActiveFilter('Upcoming')} />
        <Pill label="Completed" isActive={activeFilter === 'Completed'} onPress={() => setActiveFilter('Completed')} />
        <Pill label="All" isActive={activeFilter === 'All'} onPress={() => setActiveFilter('All')} />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          // --- Use the filtered list here ---
          data={filteredBookings}
          keyExtractor={(item) => item._id}
          renderItem={renderBookingCard}
          ListEmptyComponent={<Text style={styles.emptyText}>No bookings match the current filter.</Text>}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        />
      )} 
    </Screen>
  );
};

// --- ADD THE NEW STYLES ---
const styles = StyleSheet.create({
  container: { paddingTop: 10 },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    marginBottom: 10,
  },
  errorText: { color: colors.danger, textAlign: 'center' },
  emptyText: { color: colors.medium, textAlign: 'center', marginTop: 50 },
  cardContent: { paddingTop: 15, marginTop: 15, borderTopWidth: 1, borderTopColor: colors.light },
  detailText: { fontSize: 16, marginBottom: 5 },
  dateText: { fontSize: 16, marginBottom: 5 },
  statusContainer: {
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  statusText: { fontSize: 16, fontWeight: 'bold', color: colors.white },
  buttonGroup: { marginTop: 10 },
});

export default StaffDashboardScreen;