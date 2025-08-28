import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { vehicleService, UserVehicle } from '../../../services/vehicleService';

import Screen from '../../../components/common/Screen';
import AppButton from '../../../components/common/AppButton';
import Card from '../../../components/common/Card'; // We'll create this simple component
import colors from '../../../config/colors';

const MyGarageScreen = ({ navigation }: any) => {
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
      setError("Failed to load your vehicles.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // useFocusEffect will refetch the vehicles every time the screen comes into view
  useFocusEffect(
    useCallback(() => {
      loadVehicles();
    }, [])
  );

  if (isLoading) {
    return (
      <Screen style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </Screen>
    );
  }

  return (
    <Screen style={styles.container}>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <FlatList
        data={vehicles}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Card
            title={`${item.vehicleInfo.brand} ${item.vehicleInfo.model}`}
            subTitle={item.registrationNumber}
          />
        )}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={styles.emptyText}>You haven't added any vehicles yet.</Text>
          </View>
        }
        contentContainerStyle={{ flexGrow: 1 }}
      />
      <AppButton
        title="Add New Vehicle"
        onPress={() => navigation.navigate('AddVehicle')}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: colors.danger,
    textAlign: 'center',
    marginBottom: 10,
  },
  emptyText: {
    color: colors.medium,
    fontSize: 16,
  },
});

export default MyGarageScreen;