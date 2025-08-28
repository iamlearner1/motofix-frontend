import React, { useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';

import Screen from '../../components/common/Screen';
import AppTextInput from '../../components/common/AppTextInput';
import AppButton from '../../components/common/AppButton';

const EditProfileScreen = ({ navigation }: any) => {
  const { user, updateUser } = useAuth(); // Get user and the new updateUser function
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSaveChanges = async () => {
    if (!name || !email) {
      return Alert.alert("Validation Error", "Name and email cannot be empty.");
    }

    setIsSubmitting(true);
    try {
      const updatedUser = await authService.updateProfile(name, email);
      // Update the global state with the new user data from the server
      await updateUser(updatedUser);
      Alert.alert("Success", "Your profile has been updated.", [
        { text: "OK", onPress: () => navigation.goBack() }
      ]);
    } catch (error: any) {
      const message = error.response?.data?.message || "An error occurred.";
      Alert.alert("Update Failed", message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Screen style={styles.container}>
      <AppTextInput
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />
      <AppTextInput
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <AppButton
        title="Save Changes"
        onPress={handleSaveChanges}
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

export default EditProfileScreen;