import React, { useState } from 'react';
import { View, StyleSheet, Alert, Button, Text } from 'react-native';
import { authService } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';
// Replace these with your custom components later
// import AppButton from '../../components/common/AppButton';
// import AppTextInput from '../../components/common/AppTextInput';

const RegisterScreen = ({ navigation }: any) => {
  const { login } = useAuth(); // We'll log the user in right after they register
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    try {
      await authService.register(name, email, password);
      // After successful registration, automatically log them in
      await login(email, password);
      // Navigation to the user's home screen will happen automatically
    } catch (error: any) {
      // The error object might have response data from the server
      const message = error.response?.data?.message || "An unknown error occurred.";
      Alert.alert("Registration Failed", message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a New Account</Text>
      {/* Replace these with your AppTextInput components */}
      <View style={styles.input}><Text>TODO: Name Input</Text></View>
      <View style={styles.input}><Text>TODO: Email Input</Text></View>
      <View style={styles.input}><Text>TODO: Password Input</Text></View>
      <Button
        title={isLoading ? "Registering..." : "Register"}
        onPress={handleRegister}
        disabled={isLoading}
      />
      <Button
        title="Back to Login"
        onPress={() => navigation.goBack()}
        color="#888"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  // Placeholder style for inputs
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
});

export default RegisterScreen;