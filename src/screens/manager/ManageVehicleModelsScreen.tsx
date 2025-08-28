import React, { useState, useCallback } from 'react';
import { Text, StyleSheet, FlatList, ActivityIndicator, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { vehicleAdminService } from '../../services/vehicleAdminService';
import { PredefinedVehicle } from '../../services/vehicleService';

import Screen from '../../components/common/Screen';
import Card from '../../components/common/Card';
import AppButton from '../../components/common/AppButton';
import colors from '../../config/colors';

const ManageVehicleModelsScreen = ({ navigation }: any) => {
  const [vehicles, setVehicles] = useState<PredefinedVehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadVehicles = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await vehicleAdminService.getPredefinedVehicles();
      setVehicles(data);
    } catch (err) {
      setError("Failed to load vehicle models.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(useCallback(() => { loadVehicles(); }, []));

  if (isLoading) {
    return <Screen style={styles.center}><ActivityIndicator size="large" color={colors.primary} /></Screen>;
  }

  return (
    <Screen>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <FlatList
        data={vehicles}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Card
            title={item.brand}
            subTitle={item.model}
          />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No vehicle models found.</Text>}
        contentContainerStyle={styles.list}
      />
      <View style={styles.footer}>
        <AppButton
          title="Add New Vehicle Model"
          onPress={() => navigation.navigate('AddVehicleModel')}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  list: { padding: 20 },
  errorText: { color: colors.danger, textAlign: 'center' },
  emptyText: { color: colors.medium, textAlign: 'center', marginTop: 50 },
  footer: { paddingHorizontal: 20 },
});

export default ManageVehicleModelsScreen;