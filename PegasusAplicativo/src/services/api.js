import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';
import Constants from 'expo-constants';



let apiKey = "http://192.168.18.33:8000";
    
      if (__DEV__) {
        if (Platform.OS === 'web') {
          apiKey = 'http://127.0.0.1:8000';
        } else {
          const hostUri = Constants.expoConfig?.hostUri;
          const localIP = hostUri ? hostUri.split(':')[0] : 'localhost';
          apiKey = `http://${localIP}:8000`;
        }
      } else {
        apiKey = "http://192.168.18.33:8000";
      }

const api = axios.create({
  baseURL: `${apiKey}/api`,
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
