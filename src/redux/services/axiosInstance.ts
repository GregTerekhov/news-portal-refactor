import axios, { AxiosInstance } from 'axios';
import { jwtDecode, JwtPayload } from 'jwt-decode';

import { store, RootState } from '../store';
import { CONFIG } from 'config';
import { isTokenExpired, updateTokens } from './helpers';

const createAxiosInstance = () => {
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: CONFIG.BASE_URL_DB,
  });

  axiosInstance.interceptors.request.use(
    async (config) => {
      const state = store.getState() as RootState;
      const accessToken = state.auth.accessToken;

      const isAuthenticated: boolean = state.auth.isLoggedIn;

      if (!isAuthenticated) {
        if (!accessToken) {
          throw new Error('User is not authenticated');
        } else {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
      }

      const tokenStatus = jwtDecode<JwtPayload>(accessToken!);

      if (tokenStatus && tokenStatus.exp) {
        if (isTokenExpired(tokenStatus)) {
          await updateTokens();
        } else {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
      }
      return config;
    },
    (error) => {
      throw error;
    },
  );

  return axiosInstance;
};

const axiosInstance = createAxiosInstance();

export default axiosInstance;
