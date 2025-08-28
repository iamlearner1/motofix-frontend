import React, { useState } from 'react';
import { StyleSheet, Alert, Image, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { LoginScreenProps } from '../../types/types';

import Screen from '../../components/common/Screen';
import AppTextInput from '../../components/common/AppTextInput';
import AppButton from '../../components/common/AppButton';
import colors from '../../config/colors';

// You'll need to add a logo image to your assets folder
// const logo = require('../../assets/images/logo.png');

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
      // Navigation happens automatically via AppNavigator
    } catch (error: any) {
      const message = error.response?.data?.message || "An unexpected error occurred.";
      Alert.alert("Login Failed", message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Screen style={styles.container}>
      {/* <Image source={logo} style={styles.logo} /> */}
      <Text style={styles.title}>Welcome Back!</Text>

      <AppTextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="emailAddress"
      />
      <AppTextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="password"
      />
      <AppButton
        title="Login"
        onPress={handleLogin}
        isLoading={isLoading}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: colors.dark,
  },
  registerText: {
    color: colors.primary,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default LoginScreen;