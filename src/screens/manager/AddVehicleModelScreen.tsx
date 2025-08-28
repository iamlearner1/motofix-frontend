import React, { useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { vehicleAdminService } from '../../services/vehicleAdminService';

import Screen from '../../components/common/Screen';
import AppTextInput from '../../components/common/AppTextInput';
import AppButton from '../../components/common/AppButton';

const AddVehicleModelScreen = ({ navigation }: any) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');

  const handleCreateVehicleModel = async () => {
    if (!brand || !model) {
      return Alert.alert("Incomplete Form", "Please provide both a brand and a model name.");
    }

    setIsSubmitting(true);
    try {
      await vehicleAdminService.createVehicleModel({ brand, model });
      Alert.alert("Success", "New vehicle model has been created.", [
        { text: "OK", onPress: () => navigation.goBack() }
      ]);
    } catch (error: any) {
      const message = error.response?.data?.message || "An error occurred.";
      Alert.alert("Creation Failed", message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Screen style={styles.container}>
      <AppTextInput
        placeholder="Brand Name (e.g., Honda)"
        value={brand}
        onChangeText={setBrand}
      />
      <AppTextInput
        placeholder="Model Name (e.g., Activa 6G)"
        value={model}
        onChangeText={setModel}
      />
      <AppButton
        title="Create Vehicle Model"
        onPress={handleCreateVehicleModel}
        isLoading={isSubmitting}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: { 
    padding: 20,
    paddingTop: 40,
  },
});

export default AddVehicleModelScreen;