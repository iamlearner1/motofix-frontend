import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { bookingService, UserBooking } from '../../services/bookingService';
import { useAuth } from '../../context/AuthContext';

import Screen from '../../components/common/Screen';
import Card from '../../components/common/Card';
import colors from '../../config/colors';
import { formatDisplayDate } from '../../utils/dateUtils'; // <-- IMPORT THE HELPER
const MyBookingsScreen = ({ navigation }: any) => {
    const [bookings, setBookings] = useState<UserBooking[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const loadBookings = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const userBookings = await bookingService.getUserHistory();
            setBookings(userBookings);
        } catch (err) {
            setError("Failed to load your booking history.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    useFocusEffect(useCallback(() => { loadBookings(); }, []));
     const renderBookingCard = ({ item }: { item: UserBooking }) => {
        const isCompleted = item.status === 'Completed' || item.status === 'Cancelled';
        
        return (
            // 1. Wrap the entire Card in a TouchableOpacity
            <TouchableOpacity onPress={() => navigation.navigate('BookingDetails', { booking: item })}>
                <Card
                    title={item.location.name}
                    subTitle={item.vehicle.registrationNumber}
                >
                    <View style={styles.cardContent}>
                        <Text style={styles.dateText}>
                            {formatDisplayDate(item.slotDate)} at {item.slotTime}
                        </Text>
                        <View style={[styles.statusContainer, { backgroundColor: isCompleted ? colors.medium : colors.secondary }]}>
                            <Text style={styles.statusText}>{item.status}</Text>
                        </View>
                    </View>
                </Card>
            </TouchableOpacity>
        );
    };
    if (isLoading) {
        return <Screen style={styles.center}><ActivityIndicator size="large" color={colors.primary} /></Screen>;
    }
    return (
        <Screen>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <FlatList
                data={bookings}
                keyExtractor={(item) => item._id}
                renderItem={renderBookingCard}
                ListEmptyComponent={
                    <View style={styles.center}>
                        <Text style={styles.emptyText}>You have no booking history.</Text>
                    </View>
                }
                contentContainerStyle={styles.list}
            />
        </Screen>
    );
};
const styles = StyleSheet.create({
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    list: { padding: 20 },
    errorText: { color: colors.danger, textAlign: 'center' },
    emptyText: { color: colors.medium, fontSize: 16, textAlign: 'center' },
    cardContent: { paddingTop: 15, marginTop: 15, borderTopWidth: 1, borderTopColor: colors.light },
    dateText: { fontSize: 16, color: colors.dark, marginBottom: 10 },
    statusContainer: {
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignSelf: 'flex-start', // Important
    },
    statusText: {
        color: colors.white,
        fontWeight: 'bold',
    },
});
export default MyBookingsScreen;

