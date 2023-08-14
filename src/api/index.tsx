import {GenerateUUID} from '@constants/functional';
import {Keys} from '@constants/keys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const baseConfig = {
  baseURL: 'https://pokeapi.co/api/v2',
  headers: {
    'Content-Type': 'application/json',
    'access-control-allow-origin': '*',
  },
  /* other custom settings */
  validateStatus: () => true,
  timeout: 25000,
};

const api = axios.create(baseConfig);

api.interceptors.response.use(
  function (response) {
    if (response.status === 401) {
      Toast.show({
        type: 'error',
        text1: response?.data?.message,
      });
    }
    return Promise.resolve(response);
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default api;
