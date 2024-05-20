import axios, { AxiosInstance } from 'axios';
import { jwtDecode, JwtPayload } from 'jwt-decode';

import { Routes } from 'types';

import { Config, CONFIG } from 'config';
import { store, RootState } from '../store';
import { setTokens } from '../auth';
import { isTokenExpired, updateTokens } from './helpers';

const { BASE_URL_DB }: Config = CONFIG;

const createAxiosInstance = (): AxiosInstance => {
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: BASE_URL_DB,
  });

  axiosInstance.interceptors.request.use(
    async (config) => {
      const state = store.getState() as RootState;
      const accessToken = state.auth.accessToken;

      const isAuthenticated = state.auth.isLoggedIn;

      if (!isAuthenticated && config.url?.endsWith(Routes.CurrentUser)) {
        const abortController = new AbortController();
        config.signal = abortController.signal;

        abortController.abort();
        throw new Error('User is not authenticated');
      }

      if (accessToken) {
        if (config.url?.endsWith(Routes.PasswordChange)) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        const tokenStatus = jwtDecode<JwtPayload>(accessToken);

        if (tokenStatus && tokenStatus.exp) {
          if (isTokenExpired(tokenStatus)) {
            const response = await updateTokens();
            const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response;

            store.dispatch(
              setTokens({ accessToken: newAccessToken, refreshToken: newRefreshToken }),
            );

            config.headers['Authorization'] = `Bearer ${newAccessToken}`;
          } else {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
          }
        }

        if (config.url?.endsWith(Routes.SignOut)) {
          const refreshToken = state.auth.refreshToken;

          if (refreshToken) {
            document.cookie = `rftoken=${refreshToken}; path=/`;
          }
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
      if (response.config.url?.endsWith(Routes.SignOut)) {
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
