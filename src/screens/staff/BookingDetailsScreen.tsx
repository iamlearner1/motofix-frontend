import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StaffStackParamList } from '../../navigation/StaffTabNavigator';
import Screen from '../../components/common/Screen';
import colors from '../../config/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // <-- Import icons
type Props = NativeStackScreenProps<StaffStackParamList, 'BookingDetails'>;
// A small helper component for consistent rows
const DetailRow = ({ icon, label, value }: { icon: string, label: string, value: string }) => (
<View style={styles.detailRow}>
<MaterialCommunityIcons name={icon} size={22} color={colors.medium} style={styles.icon} />
<Text style={styles.detailLabel}>{label}: </Text>
<Text style={styles.detailValue}>{value}</Text>
</View>
);
const BookingDetailScreen = ({ route }: Props) => {
const { booking } = route.params;
return (
<Screen style={styles.container}>
<ScrollView>
{/* Customer Details Section */}
<View style={styles.section}>
<Text style={styles.sectionTitle}>Customer Details</Text>
<DetailRow icon="account" label="Name" value={booking.customer.name} />
<DetailRow icon="email" label="Email" value={booking.customer.email} />
</View>
code
Code
{/* Vehicle Details Section */}
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Vehicle Details</Text>
      <DetailRow icon="car-info" label="Brand" value={booking.vehicle.vehicleInfo.brand} />
      <DetailRow icon="car-side" label="Model" value={booking.vehicle.vehicleInfo.model} />
      <DetailRow icon="pound" label="Registration" value={booking.vehicle.registrationNumber} />
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

    {/* Customer Issue Section */}
    {booking.issueDescription && booking.issueDescription.trim() !== '' && (
      <View style={[styles.section, styles.issueSection]}>
        <Text style={styles.sectionTitle}>Issue Reported by Customer</Text>
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
container: {
padding: 10,
backgroundColor: colors.light,
},
section: {
backgroundColor: colors.white,
borderRadius: 10,
padding: 20,
marginBottom: 15,
elevation: 2,
shadowColor: '#000',
shadowOffset: { width: 0, height: 1 },
shadowOpacity: 0.2,
shadowRadius: 1.41,
},
sectionTitle: {
fontSize: 18,
fontWeight: 'bold',
marginBottom: 15,
color: colors.primary,
borderBottomWidth: 1,
borderBottomColor: colors.light,
paddingBottom: 10,
},
detailRow: {
flexDirection: 'row',
alignItems: 'center',
marginBottom: 10,
},
icon: {
marginRight: 10,
},
detailLabel: {
fontSize: 16,
fontWeight: 'bold',
color: colors.dark,
},
detailValue: {
fontSize: 16,
color: colors.medium,
flex: 1, // Allow text to wrap
},
serviceItem: {
flexDirection: 'row',
alignItems: 'center',
marginBottom: 8,
},
serviceItemText: {
fontSize: 16,
marginLeft: 10,
},
issueSection: {
backgroundColor: '#fffbe6', // A light yellow background for emphasis
},
issueContent: {
flexDirection: 'row',
alignItems: 'flex-start',
},
issueText: {
fontSize: 16,
fontStyle: 'italic',
color: colors.dark,
lineHeight: 22,
marginLeft: 10,
flex: 1, // Allow text to wrap
},
});
export default BookingDetailScreen;