import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StaffStackParamList } from '../../navigation/StaffTabNavigator';
import Screen from '../../components/common/Screen';
import colors from '../../config/colors';

type Props = NativeStackScreenProps<StaffStackParamList, 'BookingDetails'>;

const BookingDetailScreen = ({ route }: Props) => {
  const { booking } = route.params;

  return (
    <Screen style={styles.container}>
      <ScrollView>
        {/* Customer Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Details</Text>
          <Text style={styles.detailRow}>
            <Text style={styles.detailLabel}>Name: </Text>
            {booking.customer.name}
          </Text>
          <Text style={styles.detailRow}>
            <Text style={styles.detailLabel}>Email: </Text>
            {booking.customer.email}
          </Text>
        </View>

        {/* Vehicle Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vehicle Details</Text>
          <Text style={styles.detailRow}>
            <Text style={styles.detailLabel}>Brand: </Text>
            {booking.vehicle.vehicleInfo.brand}
          </Text>
          <Text style={styles.detailRow}>
            <Text style={styles.detailLabel}>Model: </Text>
            {booking.vehicle.vehicleInfo.model}
          </Text>
          <Text style={styles.detailRow}>
            <Text style={styles.detailLabel}>Registration: </Text>
            {booking.vehicle.registrationNumber}
          </Text>
        </View>

        {/* Service Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service Details</Text>
          {booking.bookedServices.map(service => (
            <Text key={service._id} style={styles.serviceItem}>• {service.name}</Text>
          ))}
        </View>

        {/* Customer Issue Section */}
        {booking.issueDescription && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Issue Reported by Customer</Text>
            <Text style={styles.issueText}>"{booking.issueDescription}"</Text>
          </View>
        )}
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  section: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: colors.primary,
  },
  detailRow: {
    fontSize: 18,
    marginBottom: 8,
  },
  detailLabel: {
    fontWeight: 'bold',
    color: colors.dark,
  },
  serviceItem: {
    fontSize: 18,
    marginBottom: 5,
  },
  issueText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: colors.medium,
  },
});

export default BookingDetailScreen;