import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { locationService, Location } from '../../../services/locationService';

import Screen from '../../../components/common/Screen';
import Card from '../../../components/common/Card';
import colors from '../../../config/colors';

const SelectLocationScreen = ({ navigation }: any) => {
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
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadLocations();
  }, []);

  const handleSelectLocation = (location: Location) => {
    // Navigate to the next step, passing the chosen location's data
    // We will create 'SelectServices' screen next
     navigation.navigate('SelectServices', { location });
    
    console.log("Selected Location:", location.name);
    // navigation.navigate('SelectServices', { location });
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