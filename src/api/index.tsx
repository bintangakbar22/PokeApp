import axios from 'axios';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const baseConfig = {
  baseURL: 'https://pokeapi.co/api/v2',
  headers: {
    'Content-Type': 'application/json',
    'access-control-allow-origin': '*',
  },
  /* other custom settings */
  timeout: 25000,
};

const api = axios.create(baseConfig);

api.interceptors.response.use(
  function (response) {
    // Toast.show({
    //   type: 'error',
    //   text1: response?.data?.message,
    // });
    return Promise.resolve(response);
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default api;
