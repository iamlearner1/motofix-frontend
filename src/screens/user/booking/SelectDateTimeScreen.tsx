import React, { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../../types/types';
import { locationService } from '../../../services/locationService';
import { bookingService, NewBookingData } from '../../../services/bookingService';
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
// State for loading and errors
const [isLoadingSlots, setIsLoadingSlots] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
// Fetch available slots whenever the user selects a new date
useEffect(() => {
if (!selectedDate) return;
const fetchSlots = async () => {
  setIsLoadingSlots(true);
  setAvailableSlots([]); // Clear previous slots
  setSelectedSlot(null); // Reset selected slot
  try {
    const slots = await locationService.getAvailableSlots(locationId, selectedDate);
    setAvailableSlots(slots);
  } catch (error) {
    Alert.alert("Error", "Could not fetch available time slots.");
    console.error(error);
  } finally {
    setIsLoadingSlots(false);
  }
};
fetchSlots();
}, [selectedDate, locationId]);
const handleDayPress = (day: DateData) => {
setSelectedDate(day.dateString); // dateString is in 'YYYY-MM-DD' format
};
     const handleConfirmBooking = async () => {
    if (!selectedDate || !selectedSlot) {
      return Alert.alert("Incomplete", "Please select a date and a time slot.");
    }
    setIsSubmitting(true);
    try {
      // --- THIS IS THE FINAL, CORRECTED PAYLOAD ---
      const bookingData: NewBookingData = {
        vehicle: vehicleId,
        location: locationId,
        bookedServices: selectedServices,
        slotDate: new Date(selectedDate).toISOString(),
        slotTime: selectedSlot,
        issueDescription: 'Something', // <-- ADD THIS LINE
      };

      console.log("Submitting final booking data:", JSON.stringify(bookingData, null, 2));
      
      await bookingService.createBooking(bookingData);

      Alert.alert("Success!", "Your service has been booked.", [
        { text: "OK", onPress: () => navigation.popToTop() }
      ]);
    } catch (error: any) {
        console.error("Backend Validation Error:", error.response?.data); 
        const message = error.response?.data?.message || "An unknown error occurred during booking.";
        Alert.alert("Booking Failed", message);
    } finally {
        setIsSubmitting(false);
    }
  };
// Memoized value for the calendar's markedDates prop
const markedDates = useMemo(() => {
return { [selectedDate]: { selected: true, selectedColor: colors.primary } };
}, [selectedDate]);
return (
<Screen style={styles.container}>
<Calendar
onDayPress={handleDayPress}
markedDates={markedDates}
minDate={new Date().toISOString().split('T')[0]} // Disable past dates
theme={{
todayTextColor: colors.primary,
arrowColor: colors.primary,
}}
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
title="Confirm Booking"
onPress={handleConfirmBooking}
disabled={!selectedSlot || !selectedDate}
isLoading={isSubmitting}
/>
</View>
</Screen>
);
};
const styles = StyleSheet.create({
container: { flex: 1 },
slotsContainer: { flex: 1, marginTop: 10 },
headerText: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginVertical: 15 },
emptyText: { textAlign: 'center', color: colors.medium, marginTop: 20 },
slot: {
flex: 1,
backgroundColor: colors.light,
padding: 15,
margin: 5,
borderRadius: 8,
alignItems: 'center',
},
selectedSlot: { backgroundColor: colors.primary },
slotText: { color: colors.dark, fontSize: 16 },
selectedSlotText: { color: colors.white, fontWeight: 'bold' },
footer: { padding: 20, borderTopWidth: 1, borderTopColor: '#eee' },
});
export default SelectDateTimeScreen;