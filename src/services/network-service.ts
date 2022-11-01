import axios from 'axios';
import {API_ROOT, NETWORK_TIMEOUT, STORAGE_KEY} from '../utils';
import * as storage from '../utils/storage';

const axiosPublic = axios.create({
  baseURL: API_ROOT,
  timeout: NETWORK_TIMEOUT,
});
const axiosAuth = axios.create({baseURL: API_ROOT, timeout: NETWORK_TIMEOUT});

axiosAuth.interceptors.request.use(
  async config => {
    const token = await storage.loadString(STORAGE_KEY.TOKEN);
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

export {axiosAuth, axiosPublic};
