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

      const isAuthenticated = state.auth.isLoggedIn;

      if (!isAuthenticated && config.url?.endsWith('/auth/current-user')) {
        const abortController = new AbortController();
        config.signal = abortController.signal;

        abortController.abort();
        throw new Error('User is not authenticated');
      }

      if (!isAuthenticated && accessToken)
        config.headers['Authorization'] = `Bearer ${accessToken}`;

      const tokenStatus = jwtDecode<JwtPayload>(accessToken!);

      if (tokenStatus && tokenStatus.exp) {
        if (isTokenExpired(tokenStatus)) {
          await updateTokens();
        } else {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
      }

      if (config.url?.endsWith('/auth/sign-out')) {
        const refreshToken = state.auth.refreshToken;

        if (refreshToken) {
          document.cookie = `rftoken=${refreshToken}; path=/`;
        }
      }
      return config;
    },
    (error) => {
      throw error;
    },
  );

  axiosInstance.interceptors.response.use(
    async (response) => {
      if (response.config.url?.endsWith('/auth/sign-out')) {
        response.config.headers['Authorization'] = '';
      }

      return response;
    },
    (error) => {
      throw error;
    },
  );

  return axiosInstance;
};

const axiosInstance = createAxiosInstance();

export default axiosInstance;
