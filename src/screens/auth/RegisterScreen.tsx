import React, { useState } from 'react';
import { StyleSheet, Alert, Text, TouchableOpacity, View, Image } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';
import axios from 'axios'; // Keep axios import for error checking

import Screen from '../../components/common/Screen';
import AppTextInput from '../../components/common/AppTextInput';
import AppButton from '../../components/common/AppButton';
import colors from '../../config/colors';

// Use the same logo as the login screen
const logo = require('../../assets/images/logo.png');

const RegisterScreen = ({ navigation }: any) => {
  const { login } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validate = (): boolean => {
    setNameError('');
    setEmailError('');
    setPasswordError('');
    let isValid = true;

    if (!name.trim()) {
      setNameError('Name is required.');
      isValid = false;
    }
    if (!email.trim()) {
      setEmailError('Email is required.');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    }
    if (!password) {
      setPasswordError('Password is required.');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      isValid = false;
    }
    return isValid;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    setIsLoading(true);
    try {
      await authService.register(name, email, password);
      await login(email, password);
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        setEmailError("An account with this email already exists.");
      } else {
        const message = error.response?.data?.message || "An unexpected error occurred.";
        Alert.alert("Registration Failed", message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Screen style={styles.container}>
      {/* --- ADDED LOGO CONTAINER --- */}
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>Create Your Account</Text>
      </View>

      <View style={styles.formContainer}>
        <AppTextInput
          icon="account-outline"
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          autoCorrect={false}
        />
        {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

        <AppTextInput
          icon="email-outline"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <AppTextInput
          icon="lock-outline"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        <AppButton
          title="Sign Up"
          onPress={handleRegister}
          isLoading={isLoading}
        />
      </View>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.loginText}>Already have an account? <Text style={styles.boldText}>Login</Text></Text>
      </TouchableOpacity>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  logoContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    // --- CHANGE: Move marginTop from here to the logo itself ---
  },
  logo: {
    width: 120, // <-- INCREASED from 100
    height: 120, // <-- INCREASED from 100
    resizeMode: 'contain',
    marginBottom: 20,
    marginTop: -20, // <-- ADDED: Negative margin to push it up
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.dark,
    marginBottom: 20, // <-- REDUCED from 30
  },
  formContainer: {
    width: '100%',
  },
  loginText: {
    color: colors.medium,
    textAlign: 'center',
    marginTop: 20,
  },
  boldText: {
    fontWeight: 'bold',
    color: colors.primary,
  },
  errorText: {
    color: colors.danger,
    marginLeft: 20,
    marginTop: -5,
    marginBottom: 5,
  },
});
export default RegisterScreen;