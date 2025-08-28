import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
// Make sure to import the types for navigation
import { HomeStackParamList } from '../../../types/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Screen from '../../../components/common/Screen';
import Checkbox from '../../../components/common/Checkbox';
import AppButton from '../../../components/common/AppButton';

// Use the correct type for the screen's props
type Props = NativeStackScreenProps<HomeStackParamList, 'SelectServices'>;

const SelectServicesScreen = ({ route, navigation }: Props) => {
  // --- THIS IS THE KEY CHANGE ---
  // We now receive BOTH vehicleId and location from the route parameters
  const { vehicleId, location } = route.params;

  // State to keep track of which service IDs are selected
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleToggleService = (serviceId: string) => {
    if (selectedServices.includes(serviceId)) {
      setSelectedServices(prev => prev.filter(id => id !== serviceId));
    } else {
      setSelectedServices(prev => [...prev, serviceId]);
    }
  };
  const handleNext = () => {
    // This function will now correctly pass all the accumulated data forward
    navigation.navigate('SelectDateTime', {
      vehicleId: vehicleId,
      locationId: location._id,
      selectedServices: selectedServices,
    });
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Services available at {location.name}</Text>
      </View>
      <FlatList
        data={location.offeredServices}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Checkbox
            label={item.name}
            checked={selectedServices.includes(item._id)}
            onPress={() => handleToggleService(item._id)}
          />
        )}
      />
      <View style={styles.footer}>
        <AppButton
          title="Next"
          onPress={handleNext}
          disabled={selectedServices.length === 0}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
});

export default SelectServicesScreen;