import React, { useState, useCallback } from 'react';
import { Text, StyleSheet, FlatList, ActivityIndicator, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { locationAdminService, Location } from '../../services/locationAdminService';

import Screen from '../../components/common/Screen';
import Card from '../../components/common/Card';
import AppButton from '../../components/common/AppButton';
import colors from '../../config/colors';

const ManageLocationsScreen = ({ navigation }: any) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadLocations = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await locationAdminService.getAllLocations();
      setLocations(data);
    } catch (err) {
      setError("Failed to load locations.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(useCallback(() => { loadLocations(); }, []));

  if (isLoading) {
    return <Screen style={styles.center}><ActivityIndicator size="large" color={colors.primary} /></Screen>;
  }

  return (
    <Screen>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <FlatList
        data={locations}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Card
            title={item.name}
            subTitle={item.address}
          />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No service locations found.</Text>}
        contentContainerStyle={styles.list}
      />
      <View style={styles.footer}>
        <AppButton
          title="Add New Location"
          onPress={() => navigation.navigate('AddLocation')}
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

export default ManageLocationsScreen;