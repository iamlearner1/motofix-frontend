import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { locationService, Location } from '../../../services/locationService';
// Import the navigation types
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/types';

import Screen from '../../../components/common/Screen';
import Card from '../../../components/common/Card';
import colors from '../../../config/colors';

// Use the correct type for the screen's props
type Props = NativeStackScreenProps<RootStackParamList, 'SelectLocation'>;

const SelectLocationScreen = ({ route, navigation }: Props) => {
  // --- THIS IS THE KEY ---
  // We correctly receive the vehicleId from the previous screen
   const vehicleId = route.params?.vehicleId;

  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLocations = async () => {
      try {
        const data = await locationService.getAllLocations();
        setLocations(data);
      } catch (err) {
        setError("Could not load service locations.");
      } finally {
        setIsLoading(false);
      }
    };
    loadLocations();
  }, []);

  const handleSelectLocation = (location: Location) => {
    // This check ensures we don't navigate forward if the vehicleId is somehow missing
    if (!vehicleId) {
      console.error("Error: vehicleId is missing, cannot proceed.");
      // Optionally, show an alert to the user and navigate back
      // Alert.alert("Error", "Could not find selected vehicle. Please try again.");
      // navigation.goBack();
      return;
    }
    navigation.navigate('SelectServices', { 
      vehicleId: vehicleId, // <-- Pass it on!
      location: location,
    });
  };

  if (isLoading) {
    return (
      <Screen style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </Screen>
    );
  }

  if (error) {
    return (
      <Screen style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <FlatList
        data={locations}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectLocation(item)}>
            <Card title={item.name} subTitle={item.address} />
          </TouchableOpacity>
        )}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: colors.danger,
  },
});

export default SelectLocationScreen;