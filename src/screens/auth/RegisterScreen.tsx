import React, { useState } from 'react';
import { StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';

import Screen from '../../components/common/Screen';
import AppTextInput from '../../components/common/AppTextInput';
import AppButton from '../../components/common/AppButton';
import colors from '../../config/colors';

const RegisterScreen = ({ navigation }: any) => {
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      return Alert.alert("Validation Error", "Please fill in all fields.");
    }
    setIsLoading(true);
    try {
      await authService.register(name, email, password);
      // If registration is successful, automatically log the new user in
      await login(email, password);
    } catch (error: any) {
      const message = error.response?.data?.message || "An unexpected error occurred.";
      Alert.alert("Registration Failed", message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Screen style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <AppTextInput
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        autoCorrect={false}
      />
      <AppTextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <AppTextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <AppButton
        title="Register"
        onPress={handleRegister}
        isLoading={isLoading}
      />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: colors.dark,
  },
  loginText: {
    color: colors.primary,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default RegisterScreen;