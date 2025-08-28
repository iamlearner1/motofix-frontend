import React, { useState, useCallback } from 'react';
import { Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { vehicleService, UserVehicle } from '../../../services/vehicleService';

import Screen from '../../../components/common/Screen';
import AppButton from '../../../components/common/AppButton';
import Card from '../../../components/common/Card';
import colors from '../../../config/colors';
import { View } from 'react-native';

const SelectVehicleScreen = ({ navigation }: any) => {
  const [vehicles, setVehicles] = useState<UserVehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadVehicles = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const userVehicles = await vehicleService.getUserVehicles();
      setVehicles(userVehicles);
    } catch (err) {
      setError("Failed to load your vehicles. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // useFocusEffect re-loads data every time the screen comes into view
  useFocusEffect(useCallback(() => { loadVehicles(); }, []));

  const handleSelectVehicle = (vehicleId: string) => {
    // Navigate to the next step (SelectLocation), passing the chosen vehicle's ID
    navigation.navigate('SelectLocation', { vehicleId });
  };

  if (isLoading) {
    return <Screen style={styles.center}><ActivityIndicator size="large" color={colors.primary} /></Screen>;
  }

  // A very important edge case: what if the user has no vehicles?
  if (!isLoading && vehicles.length === 0) {
    return (
      <Screen style={styles.center}>
        <Text style={styles.emptyText}>You must add a vehicle to your garage before you can book a service.</Text>
        <AppButton
          title="Add a Vehicle"
          // This navigates to the 'AddVehicle' screen inside the 'GarageFlow' tab stack
          onPress={() => navigation.navigate('GarageFlow', { screen: 'AddVehicle' })}
        />
      </Screen>
    );
  }

  return (
    <Screen>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <FlatList
        data={vehicles}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectVehicle(item._id)}>
            <Card
              title={`${item.vehicleInfo.brand} ${item.vehicleInfo.model}`}
              subTitle={item.registrationNumber}
            />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  list: { padding: 20 },
  errorText: { color: colors.danger, textAlign: 'center', marginBottom: 10 },
  emptyText: { color: colors.medium, fontSize: 16, textAlign: 'center', marginBottom: 20 },
});

export default SelectVehicleScreen;