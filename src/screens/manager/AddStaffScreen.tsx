// --- THIS IS THE CORRECTED IMPORT LINE ---
import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { managerService } from '../../services/managerService';
import { locationService } from '../../services/locationService';

import Screen from '../../components/common/Screen';
import AppTextInput from '../../components/common/AppTextInput';
import AppPicker, { PickerItem } from '../../components/common/AppPicker';
import AppButton from '../../components/common/AppButton';
import colors from '../../config/colors';

const AddStaffScreen = ({ navigation }: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locations, setLocations] = useState<PickerItem[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred", error, [
        { text: "OK", onPress: () => setError(null) }
      ]);
    }
  }, [error]);

  useEffect(() => {
    const loadLocations = async () => {
      try {
        const locationData = await locationService.getAllLocations();
        const locationItems = locationData.map(loc => ({
          label: loc.name,
          value: loc._id,
        }));
        setLocations(locationItems);
      } catch (err) {
        setError("Failed to load locations. Please go back and try again.");
      } finally {
        setIsLoading(false);
      }
    };
    loadLocations();
  }, []);

  const handleCreateStaff = async () => {
    if (!name || !email || !password || !selectedLocationId) {
      return Alert.alert("Incomplete Form", "Please fill in all fields.");
    }
    setIsSubmitting(true);
    try {
      await managerService.createStaffMember({
        name,
        email,
        password,
        location: selectedLocationId,
      });
      Alert.alert("Success", "New staff member has been created.", [
        { text: "OK", onPress: () => navigation.goBack() }
      ]);
    } catch (error: any) {
      const message = error.response?.data?.message || "An error occurred.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    // --- ADDED CONTENT INSIDE THE SCREEN COMPONENT ---
    return (
      <Screen style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </Screen>
    );
  }

  return (
    // --- ADDED CONTENT INSIDE THE SCREEN COMPONENT ---
    <Screen style={styles.container}>
      <AppTextInput placeholder="Full Name" value={name} onChangeText={setName} />
      <AppTextInput placeholder="Email Address" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <AppTextInput placeholder="Temporary Password" value={password} onChangeText={setPassword} secureTextEntry />
      <AppPicker
        placeholder="Assign to Location"
        items={locations}
        selectedValue={selectedLocationId}
        onValueChange={(locationId) => setSelectedLocationId(locationId)}
      />
      <AppButton
        title="Create Staff Member"
        onPress={handleCreateStaff}
        isLoading={isSubmitting}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default AddStaffScreen;