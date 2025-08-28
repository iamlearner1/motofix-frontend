import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from '../navigation/navigationUtils';

const apiClient = axios.create({
  baseURL: 'http://192.168.1.27:8000/api/v1',
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor to handle expired tokens
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log("Token expired or invalid. Logging out and redirecting to Login.");
      await AsyncStorage.multiRemove(['userToken', 'userData']);
      // Use the navigation ref to navigate from outside a component
      navigate('Login', undefined);
    }
    return Promise.reject(error);
  }
);

export default apiClient;