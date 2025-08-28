import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../api/apiClient';
import { authService } from '../services/authService';
import { User, AuthContextType } from '../types/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFromStorage = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('userToken');
        const storedUser = await AsyncStorage.getItem('userData');
        if (storedToken && storedUser) {
          const userData: User = JSON.parse(storedUser);
          setToken(storedToken);
          setUser(userData);
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        }
      } catch (e) {
        console.error("Failed to load auth data", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadFromStorage();
  }, []);

  const login = async (email: string, password: string) => {
    const { accessToken, user } = await authService.login(email, password);
    setUser(user);
    setToken(accessToken);
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    await AsyncStorage.setItem('userToken', accessToken);
    await AsyncStorage.setItem('userData', JSON.stringify(user));
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    delete apiClient.defaults.headers.common['Authorization'];
    await AsyncStorage.multiRemove(['userToken', 'userData']);
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};