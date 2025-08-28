import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../../types/types';
import { bookingService, NewBookingData } from '../../../services/bookingService';
import { formatDisplayDate } from '../../../utils/dateUtils';

import Screen from '../../../components/common/Screen';
import AppTextInput from '../../../components/common/AppTextInput';
import AppButton from '../../../components/common/AppButton';
import colors from '../../../config/colors';

type Props = NativeStackScreenProps<HomeStackParamList, 'ConfirmBooking'>;

const SummaryRow = ({ label, value }: { label: string, value: string }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const ConfirmBookingScreen = ({ route, navigation }: Props) => {
  const { 
    vehicleId, 
    locationId, 
    selectedServices, 
    slotDate, 
    slotTime,
    vehicleDetails,
    locationDetails
  } = route.params;

  const [issueDescription, setIssueDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirmBooking = async () => {
    setIsSubmitting(true);
    try {
      const bookingData: NewBookingData = {
        vehicle: vehicleId,
        location: locationId,
        bookedServices: selectedServices,
        slotDate: new Date(slotDate).toISOString(),
        slotTime: slotTime,
        issueDescription: issueDescription, // <-- Use the value from the input
      };
      
      await bookingService.createBooking(bookingData);

      Alert.alert("Success!", "Your service has been booked.", [
        { text: "OK", onPress: () => navigation.popToTop() }
      ]);
    } catch (error: any) {
      const message = error.response?.data?.message || "An error occurred during booking.";
      Alert.alert("Booking Failed", message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Screen style={styles.container}>
      <ScrollView>
        <View style={styles.summaryCard}>
          <Text style={styles.cardTitle}>Booking Summary</Text>
          <SummaryRow label="Vehicle" value={`${vehicleDetails.vehicleInfo.brand} ${vehicleDetails.vehicleInfo.model}`} />
          <SummaryRow label="Registration" value={vehicleDetails.registrationNumber} />
          <SummaryRow label="Location" value={locationDetails.name} />
          <SummaryRow label="Date" value={formatDisplayDate(slotDate)} />
          <SummaryRow label="Time" value={slotTime} />
        </View>

        <View style={styles.issueCard}>
          <Text style={styles.cardTitle}>Describe any Issues (Optional)</Text>
          <AppTextInput
            placeholder="e.g., Engine is making a rattling noise on cold starts."
            value={issueDescription}
            onChangeText={setIssueDescription}
            multiline
            numberOfLines={4}
            style={{ height: 100, textAlignVertical: 'top' }}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <AppButton
          title="Confirm & Book Service"
          onPress={handleConfirmBooking}
          isLoading={isSubmitting}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: colors.light },
  summaryCard: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    margin: 20,
  },
  issueCard: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
  },
  label: {
    fontSize: 16,
    color: colors.medium,
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    color: colors.dark,
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
});

export default ConfirmBookingScreen;