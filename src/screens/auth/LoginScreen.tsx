import React, { useState } from 'react';
import { StyleSheet, Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { LoginScreenProps } from '../../types/types';

import Screen from '../../components/common/Screen';
import AppTextInput from '../../components/common/AppTextInput';
import AppButton from '../../components/common/AppButton';
import colors from '../../config/colors';

// Make sure you have a logo image at this path
const logo = require('../../assets/images/logo.png'); 

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert("Validation Error", "Please enter both email and password.");
    }
    setIsLoading(true);
    try {
      await login(email, password);
    } catch (error: any) {
      const message = error.response?.data?.message || "An unexpected error occurred.";
      Alert.alert("Login Failed", message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.tagline}>Your Trusted Service Partner</Text>
      </View>

      <View style={styles.formContainer}>
        <AppTextInput
          icon="email-outline" // Use the outline version of the icon
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <AppTextInput
          icon="lock-outline" // Use the outline version of the icon
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <AppButton
          title="Login"
          onPress={handleLogin}
          isLoading={isLoading}
        />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>Don't have an account? <Text style={styles.boldText}>Sign Up</Text></Text>
      </TouchableOpacity>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white, // Set the main background to white
    paddingHorizontal: 30, // Add horizontal padding to the screen
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60, // Push the header down from the top
    marginBottom: 50,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  tagline: {
    fontSize: 18,
    fontWeight: '500', // Use a slightly lighter font weight
    color: colors.medium,
    marginTop: 20,
  },
  formContainer: {
    width: '100%',
    marginBottom: 20, // Add space before the "Sign Up" text
  },
  registerText: {
    color: colors.medium,
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
    color: colors.primary,
  },
});

export default LoginScreen;