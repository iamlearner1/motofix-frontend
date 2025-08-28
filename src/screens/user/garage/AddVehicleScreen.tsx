import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert, ActivityIndicator, View } from 'react-native';
import { vehicleService, PredefinedVehicle } from '../../../services/vehicleService';

import Screen from '../../../components/common/Screen';
import AppButton from '../../../components/common/AppButton';
import AppTextInput from '../../../components/common/AppTextInput';
import AppPicker, { PickerItem } from '../../../components/common/AppPicker';
import colors from '../../../config/colors';

const AddVehicleScreen = ({ navigation }: any) => {
  // Loading and error state
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Data state
  const [allVehicles, setAllVehicles] = useState<PredefinedVehicle[]>([]);
  const [brands, setBrands] = useState<PickerItem[]>([]);
  const [models, setModels] = useState<PickerItem[]>([]);

  // Form state
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
  const [registrationNumber, setRegistrationNumber] = useState('');

  // --- NEW: useEffect to handle showing the error alert ---
  useEffect(() => {
    // This effect runs only when the 'error' state changes from null to a string
    if (error) {
      Alert.alert("An Error Occurred", error, [
        // Add a button to the alert to allow the user to clear the error
        { text: 'OK', onPress: () => setError(null) },
      ]);
    }
  }, [error]);

  // 1. Fetch all predefined vehicles on component mount
  useEffect(() => {
    const loadPredefinedVehicles = async () => {
      try {
        const vehicles = await vehicleService.getPredefinedVehicles();
        setAllVehicles(vehicles);
        const uniqueBrands = [...new Set(vehicles.map(v => v.brand))];
        setBrands(uniqueBrands.map(brand => ({ label: brand, value: brand })));
      } catch (err) {
        setError("Failed to load vehicle data. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadPredefinedVehicles();
  }, []);

  // 2. Update the models dropdown whenever the selected brand changes
  useEffect(() => {
    if (selectedBrand) {
      const filteredModels = allVehicles
        .filter(v => v.brand === selectedBrand)
        .map(v => ({ label: v.model, value: v._id }));
      setModels(filteredModels);
    } else {
      setModels([]);
    }
    setSelectedModelId(null);
  }, [selectedBrand, allVehicles]);

  // 3. Handle the form submission
  const handleAddVehicle = async () => {
    if (!selectedModelId || !registrationNumber) {
      return Alert.alert("Incomplete Form", "Please select a brand, model, and enter a registration number.");
    }

    setIsSubmitting(true);
    try {
      await vehicleService.addUserVehicle({
        predefinedVehicleId: selectedModelId,
        registrationNumber: registrationNumber.toUpperCase(),
      });
      Alert.alert("Success", "Vehicle added to your garage!", [
        { text: 'OK', onPress: () => navigation.goBack() } // Go back after success
      ]);
    } catch (error: any) {
      const message = error.response?.data?.message || "An error occurred while adding the vehicle.";
      setError(message); // Set the error state to trigger the useEffect alert
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Screen style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </Screen>
    );
  }

  return (
    <Screen style={styles.container}>
      {/* The incorrect line that caused the error has been removed from here */}
      <AppPicker
        placeholder="Select Brand"
        items={brands}
        selectedValue={selectedBrand}
        onValueChange={(brand) => setSelectedBrand(brand)}
      />

      {selectedBrand && (
        <AppPicker
          placeholder="Select Model"
          items={models}
          selectedValue={selectedModelId}
          onValueChange={(modelId) => setSelectedModelId(modelId)}
        />
      )}

      <AppTextInput
        placeholder="Registration Number (e.g., MH12AB3456)"
        value={registrationNumber}
        onChangeText={setRegistrationNumber}
        autoCapitalize="characters"
      />

      <AppButton
        title="Add Vehicle to Garage"
        onPress={handleAddVehicle}
        isLoading={isSubmitting}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddVehicleScreen;