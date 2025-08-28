import React, { useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { serviceAdminService } from '../../services/serviceAdminService';

import Screen from '../../components/common/Screen';
import AppTextInput from '../../components/common/AppTextInput';
import AppButton from '../../components/common/AppButton';

const AddServiceScreen = ({ navigation }: any) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateService = async () => {
    if (!name || !description) {
      return Alert.alert("Incomplete Form", "Please provide both a name and a description for the service.");
    }

    setIsSubmitting(true);
    try {
      await serviceAdminService.createService({ name, description });
      Alert.alert("Success", "New service has been created.", [
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
        placeholder="Service Name (e.g., Tire Change)"
        value={name}
        onChangeText={setName}
      />
      <AppTextInput
        placeholder="Service Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={3}
      />
      <AppButton
        title="Create Service"
        onPress={handleCreateService}
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

export default AddServiceScreen;