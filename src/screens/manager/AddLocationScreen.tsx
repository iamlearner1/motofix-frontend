import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert, ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { locationAdminService } from '../../services/locationAdminService';
import { serviceAdminService } from '../../services/serviceAdminService';
import { Service } from '../../services/locationService';

import Screen from '../../components/common/Screen';
import AppTextInput from '../../components/common/AppTextInput';
import AppButton from '../../components/common/AppButton';
import Checkbox from '../../components/common/Checkbox';
import colors from '../../config/colors';

const AddLocationScreen = ({ navigation }: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [allServices, setAllServices] = useState<Service[]>([]);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [openingTime, setOpeningTime] = useState('');
  const [closingTime, setClosingTime] = useState('');
  const [slotDuration, setSlotDuration] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred", error, [{ text: "OK", onPress: () => setError(null) }]);
    }
  }, [error]);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const serviceData = await serviceAdminService.getAllServices();
        setAllServices(serviceData);
      } catch (err) {
        setError("Failed to load services. Please go back and try again.");
      } finally {
        setIsLoading(false);
      }
    };
    loadServices();
  }, []);

  const handleToggleService = (serviceId: string) => {
    if (selectedServices.includes(serviceId)) {
      setSelectedServices(prev => prev.filter(id => id !== serviceId));
    } else {
      setSelectedServices(prev => [...prev, serviceId]);
    }
  };

  const handleCreateLocation = async () => {
    if (!name || !address || !openingTime || !closingTime || !slotDuration || selectedServices.length === 0) {
      return Alert.alert("Incomplete Form", "Please fill in all fields and select at least one service.");
    }

    const duration = parseInt(slotDuration, 10);
    if (isNaN(duration)) {
        return Alert.alert("Invalid Input", "Slot duration must be a number.");
    }

    setIsSubmitting(true);
    try {
      await locationAdminService.createLocation({
        name,
        address,
        openingTime,
        closingTime,
        slotDurationMinutes: duration,
        offeredServices: selectedServices,
      });
      Alert.alert("Success", "New location has been created.", [
        { text: "OK", onPress: () => navigation.goBack() }
      ]);
    } catch (error: any) {
      // --- THIS IS THE KEY IMPROVEMENT ---
      // Log the full error to the console for debugging
      console.error("Backend Validation Error:", error.response?.data);

      // Check if the backend sent specific validation errors
      if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
        // Format the errors for the user
        const formattedErrors = error.response.data.errors.map((err: any) => {
          const field = Object.keys(err)[0];
          return `- ${err[field]}`;
        }).join('\n');
        setError(`Please fix the following issues:\n${formattedErrors}`);
      } else {
        // Fallback for generic errors
        const message = error.response?.data?.message || "An error occurred.";
        setError(message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <Screen style={styles.center}><ActivityIndicator size="large" color={colors.primary} /></Screen>;
  }

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        <AppTextInput placeholder="Location Name" value={name} onChangeText={setName} />
        <AppTextInput placeholder="Full Address" value={address} onChangeText={setAddress} />
        
        {/* Added better guidance for time inputs */}
        <AppTextInput placeholder="Opening Time (e.g., 09:00)" value={openingTime} onChangeText={setOpeningTime} maxLength={5} />
        <AppTextInput placeholder="Closing Time (e.g., 17:00)" value={closingTime} onChangeText={setClosingTime} maxLength={5} />
        
        <AppTextInput placeholder="Slot Duration (e.g., 60)" value={slotDuration} onChangeText={setSlotDuration} keyboardType="numeric" />
        
        <Text style={styles.subHeader}>Offered Services</Text>
        {allServices.map(service => (
          <Checkbox
            key={service._id}
            label={service.name}
            checked={selectedServices.includes(service._id)}
            onPress={() => handleToggleService(service._id)}
          />
        ))}

        <View style={{ marginTop: 20 }}>
          <AppButton
            title="Create Location"
            onPress={handleCreateLocation}
            isLoading={isSubmitting}
          />
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  subHeader: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10, color: colors.dark },
});

export default AddLocationScreen;