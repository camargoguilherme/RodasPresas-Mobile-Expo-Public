import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {URL_BACKEND} from '../constants'

const api = axios.create({
  baseURL: URL_BACKEND,
});

api.interceptors.request.use(
  async function (config) {
    const storageToken = await AsyncStorage.getItem('Auth_token');
    // Do something before request is sent
    config.headers.Authorization = `Bearer ${storageToken}`;
    return config;
  },
  function (error) {
    // Do something with request error
    try {
      let {data} = error.request;
      if (!data) {
        data = error.request;
      }
      return Promise.reject(data);
    } catch (error) {
      return Promise.reject({
        message: [
          'Não foi possível realizar a operação desejada',
          'Tente novamente mais tarde',
        ].join('\n'),
      });
    }
  }
);

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    // Do something with response error
    try {
      let {data} = error.response;
      if (!data) {
        data = error.response;
      }
      return Promise.reject(data);
    } catch (error) {
      return Promise.reject({
        message: [
          'Não foi possível realizar a operação desejada',
          'Tente novamente mais tarde',
        ].join('\n'),
      });
    }
  }
);

export default api;
