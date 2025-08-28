import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BookingsStackParamList } from '../../navigation/UserTabNavigator';
import Screen from '../../components/common/Screen';
import colors from '../../config/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { formatDisplayDate } from '../../utils/dateUtils';

type Props = NativeStackScreenProps<BookingsStackParamList, 'BookingDetails'>;

const DetailRow = ({ icon, label, value }: { icon: string, label: string, value: string }) => (
  <View style={styles.detailRow}>
    <MaterialCommunityIcons name={icon} size={22} color={colors.medium} style={styles.icon} />
    <Text style={styles.detailLabel}>{label}: </Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const UserBookingDetailScreen = ({ route }: Props) => {
  const { booking } = route.params;

  return (
    <Screen style={styles.container}>
      <ScrollView>
        {/* Status Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appointment Status</Text>
          <View style={[styles.statusContainer, { backgroundColor: booking.status === 'Completed' ? colors.medium : colors.secondary }]}>
            <Text style={styles.statusText}>{booking.status}</Text>
          </View>
        </View>

        {/* Appointment Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appointment Details</Text>
          <DetailRow icon="map-marker" label="Location" value={booking.location.name} />
          <DetailRow icon="calendar-clock" label="Date & Time" value={`${formatDisplayDate(booking.slotDate)} at ${booking.slotTime}`} />
        </View>

        {/* Vehicle Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vehicle Being Serviced</Text>
          <DetailRow icon="motorbike" label="Registration" value={booking.vehicle.registrationNumber} />
        </View>

        {/* Service Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Services Requested</Text>
          {booking.bookedServices.map(service => (
            <View key={service._id} style={styles.serviceItem}>
              <MaterialCommunityIcons name="check-circle-outline" size={20} color={colors.secondary} />
              <Text style={styles.serviceItemText}>{service.name}</Text>
            </View>
          ))}
        </View>

        {/* Your Notes Section */}
        {booking.issueDescription && booking.issueDescription.trim() !== '' && (
          <View style={[styles.section, styles.issueSection]}>
            <Text style={styles.sectionTitle}>Your Notes / Issues</Text>
            <View style={styles.issueContent}>
              <MaterialCommunityIcons name="alert-circle-outline" size={24} color={colors.danger} />
              <Text style={styles.issueText}>"{booking.issueDescription}"</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10, backgroundColor: colors.light },
  section: { backgroundColor: colors.white, borderRadius: 10, padding: 20, marginBottom: 15, elevation: 2 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: colors.primary, borderBottomWidth: 1, borderBottomColor: colors.light, paddingBottom: 10 },
  detailRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  icon: { marginRight: 10 },
  detailLabel: { fontSize: 16, fontWeight: 'bold', color: colors.dark },
  detailValue: { fontSize: 16, color: colors.medium, flex: 1 },
  serviceItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  serviceItemText: { fontSize: 16, marginLeft: 10 },
  issueSection: { backgroundColor: '#fffbe6' },
  issueContent: { flexDirection: 'row', alignItems: 'flex-start' },
  issueText: { fontSize: 16, fontStyle: 'italic', color: colors.dark, lineHeight: 22, marginLeft: 10, flex: 1 },
  statusContainer: { borderRadius: 20, paddingVertical: 8, paddingHorizontal: 15, alignSelf: 'flex-start' },
  statusText: { color: colors.white, fontWeight: 'bold', fontSize: 16 },
});

export default UserBookingDetailScreen;