import React, { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../../types/types';
import { locationService, Location } from '../../../services/locationService';
import { vehicleService, UserVehicle } from '../../../services/vehicleService';

import Screen from '../../../components/common/Screen';
import AppButton from '../../../components/common/AppButton';
import colors from '../../../config/colors';

type Props = NativeStackScreenProps<HomeStackParamList, 'SelectDateTime'>;

const SelectDateTimeScreen = ({ route, navigation }: Props) => {
  const { vehicleId, locationId, selectedServices } = route.params;

  // State for the calendar and slots
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // State for loading details needed for the next screen
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);
  const [vehicleDetails, setVehicleDetails] = useState<UserVehicle | null>(null);
  const [locationDetails, setLocationDetails] = useState<Location | null>(null);

  // State for slots loading
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  // Fetch the full vehicle/location details on component mount
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsLoadingDetails(true);
        // Using Promise.all to fetch in parallel for better performance
        const [allVehicles, allLocations] = await Promise.all([
          vehicleService.getUserVehicles(),
          locationService.getAllLocations(),
        ]);
        
        const currentVehicle = allVehicles.find(v => v._id === vehicleId);
        setVehicleDetails(currentVehicle || null);

        const currentLocation = allLocations.find(l => l._id === locationId);
        setLocationDetails(currentLocation || null);

      } catch (error) {
        Alert.alert("Error", "Could not load necessary booking details. Please go back and try again.");
      } finally {
        setIsLoadingDetails(false);
      }
    };
    fetchDetails();
  }, [vehicleId, locationId]);

  // Fetch available slots whenever the user selects a new date
  useEffect(() => {
    if (!selectedDate) return;
    const fetchSlots = async () => {
      setIsLoadingSlots(true);
      setAvailableSlots([]);
      setSelectedSlot(null);
      try {
        const slots = await locationService.getAvailableSlots(locationId, selectedDate);
        setAvailableSlots(slots);
      } catch (error) {
        Alert.alert("Error", "Could not fetch available time slots.");
      } finally {
        setIsLoadingSlots(false);
      }
    };
    fetchSlots();
  }, [selectedDate, locationId]);

  const handleDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
  };

  // --- THIS IS THE NEW NAVIGATION HANDLER ---
  const handleReviewBooking = () => {
    if (!selectedDate || !selectedSlot) {
      return Alert.alert("Incomplete", "Please select a date and a time slot.");
    }
    if (!vehicleDetails || !locationDetails) {
        return Alert.alert("Loading...", "Please wait a moment for details to load.");
    }
    
    // Navigate to the final confirmation screen, passing all data
    navigation.navigate('ConfirmBooking', {
      vehicleId,
      locationId,
      selectedServices,
      slotDate: selectedDate,
      slotTime: selectedSlot,
      vehicleDetails, // Pass the full object for display
      locationDetails, // Pass the full object for display
    });
  };

  // Memoized value for the calendar's markedDates prop
  const markedDates = useMemo(() => ({
    [selectedDate]: { selected: true, selectedColor: colors.primary }
  }), [selectedDate]);

  if (isLoadingDetails) {
    return <Screen style={styles.center}><ActivityIndicator size="large" color={colors.primary} /></Screen>;
  }

  return (
    <Screen style={styles.container}>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={markedDates}
        minDate={new Date().toISOString().split('T')[0]}
        theme={{ todayTextColor: colors.primary, arrowColor: colors.primary }}
      />
      <View style={styles.slotsContainer}>
        {isLoadingSlots ? (
          <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }}/>
        ) : (
          <FlatList
            data={availableSlots}
            keyExtractor={(item) => item}
            numColumns={3}
            ListHeaderComponent={selectedDate ? <Text style={styles.headerText}>Available Slots for {selectedDate}</Text> : null}
            ListEmptyComponent={selectedDate ? <Text style={styles.emptyText}>No available slots for this day.</Text> : null}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.slot, selectedSlot === item && styles.selectedSlot]}
                onPress={() => setSelectedSlot(item)}
              >
                <Text style={[styles.slotText, selectedSlot === item && styles.selectedSlotText]}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
      <View style={styles.footer}>
        <AppButton
          title="Review Booking"
          onPress={handleReviewBooking}
          disabled={!selectedSlot || !selectedDate}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  slotsContainer: { flex: 1, marginTop: 10 },
  headerText: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginVertical: 15 },
  emptyText: { textAlign: 'center', color: colors.medium, marginTop: 20 },
  slot: { flex: 1, backgroundColor: colors.light, padding: 15, margin: 5, borderRadius: 8, alignItems: 'center' },
  selectedSlot: { backgroundColor: colors.primary },
  slotText: { color: colors.dark, fontSize: 16 },
  selectedSlotText: { color: colors.white, fontWeight: 'bold' },
  footer: { padding: 20, borderTopWidth: 1, borderTopColor: '#eee' },
});

export default SelectDateTimeScreen;