import React, { useState, useCallback } from 'react';
import { Text, StyleSheet, FlatList, ActivityIndicator, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { serviceAdminService } from '../../services/serviceAdminService';
import { Service } from '../../services/locationService';

import Screen from '../../components/common/Screen';
import Card from '../../components/common/Card';
import AppButton from '../../components/common/AppButton';
import colors from '../../config/colors';

const ManageServicesScreen = ({ navigation }: any) => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadServices = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await serviceAdminService.getAllServices();
      setServices(data);
    } catch (err) {
      setError("Failed to load services.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(useCallback(() => { loadServices(); }, []));

  if (isLoading) {
    return <Screen style={styles.center}><ActivityIndicator size="large" color={colors.primary} /></Screen>;
  }

  return (
    <Screen>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <FlatList
        data={services}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Card
            title={item.name}
            subTitle={item.description}
          />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No services found.</Text>}
        contentContainerStyle={styles.list}
      />
      <View style={styles.footer}>
        <AppButton
          title="Add New Service"
          onPress={() => navigation.navigate('AddService')}
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

export default ManageServicesScreen;