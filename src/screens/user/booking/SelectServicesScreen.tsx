import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { HomeStackParamList } from '../../../types/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Screen from '../../../components/common/Screen';
import Checkbox from '../../../components/common/Checkbox';
import AppButton from '../../../components/common/AppButton';

// Define the type for the screen's props, including route params
type Props = NativeStackScreenProps<HomeStackParamList, 'SelectServices'>;

const SelectServicesScreen = ({ route, navigation }: Props) => {
  // Get the location object passed from the previous screen
  const { location } = route.params;

  // State to keep track of which service IDs are selected
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleToggleService = (serviceId: string) => {
    // Check if the service is already selected
    if (selectedServices.includes(serviceId)) {
      // If yes, remove it
      setSelectedServices(prev => prev.filter(id => id !== serviceId));
    } else {
      // If no, add it
      setSelectedServices(prev => [...prev, serviceId]);
    }
  };

  const handleNext = () => {
    console.log("Selected Location ID:", location._id);
    console.log("Selected Service IDs:", selectedServices);
    // Navigate to the next screen (SelectDateTime), passing the necessary data
    // navigation.navigate('SelectDateTime', {
    //   locationId: location._id,
    //   selectedServices: selectedServices,
    // });
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
          // Disable the button if no services are selected
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