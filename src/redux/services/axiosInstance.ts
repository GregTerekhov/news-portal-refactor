import axios, { AxiosInstance } from 'axios';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import dayjs from 'dayjs';

import { store, RootState } from '../store';
import { BASE_URL_DB } from './constants';
import { setTokens } from '../auth';

import { RefreshTokensResponse } from 'types';

const createAxiosInstance = () => {
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: BASE_URL_DB,
  });

  axiosInstance.interceptors.request.use(
    async (config) => {
      const state = store.getState() as RootState;
      const accessToken = state.auth.accessToken;

      const isAuthenticated: boolean = state.auth.isLoggedIn;

      if (!(accessToken && isAuthenticated)) {
        throw new Error('User is not authenticated');
      }

      const tokenStatus = jwtDecode<JwtPayload>(accessToken!);
      if (tokenStatus && tokenStatus.exp) {
        const currentTime = dayjs().unix();
        const tokenExpiryTime = tokenStatus.exp; // час смерті токена
        const isExpired = currentTime > tokenExpiryTime;

        if (isExpired) {
          const persistedToken = state.auth.refreshToken;
          if (!persistedToken) {
            throw new Error('Refresh token is missing');
          }
          try {
            const response = await axios.post<RefreshTokensResponse>(
              `${BASE_URL_DB}/auth/refresh`,
              {
                refreshToken: persistedToken,
              },
            );
            store.dispatch(setTokens(response.data.data));
          } catch (error) {
            console.error('Token refreshing error', error);
            return Promise.reject(error);
          }
        } else {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
      }

      return config;
    },
    (error) => {
      console.log('error in Instance', error);
      return Promise.reject(error);
    },
  );

  return axiosInstance;
};

const axiosInstance = createAxiosInstance();

export default axiosInstance;
