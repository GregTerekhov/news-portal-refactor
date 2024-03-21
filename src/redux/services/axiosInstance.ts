import axios, { AxiosInstance } from 'axios';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import dayjs from 'dayjs';

import { store, RootState } from '../store';
import { CONFIG } from 'config';
import { setTokens } from '../auth';

import type { RefreshTokensResponse } from 'types';

const updateTokens = async () => {
  const state = store.getState() as RootState;
  const persistedToken = state.auth.refreshToken;

  if (!persistedToken) {
    throw new Error('Refresh token is missing');
  }

  try {
    const response = await axios.post<RefreshTokensResponse>(`${CONFIG.BASE_URL_DB}/auth/refresh`, {
      refreshToken: persistedToken,
    });
    store.dispatch(setTokens(response.data.data));
  } catch (error) {
    console.error('Token refreshing error', error);
    throw error;
  }
};

const isTokenExpired = (tokenStatus: JwtPayload): boolean | undefined => {
  const currentTime = dayjs().unix();
  const tokenExpiryTime = tokenStatus.exp; // час смерті токена
  if (tokenExpiryTime) return currentTime > tokenExpiryTime;

  return undefined;
};

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
