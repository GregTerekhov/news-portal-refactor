import axios, { AxiosInstance } from 'axios';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import dayjs from 'dayjs';

import store, { RootState } from '../store';
import { BASE_URL_DB } from './constants';
import { setTokens } from '../auth/authSlice';

import { RefreshTokensResponse } from 'types';

const createAxiosInstance = () => {
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: BASE_URL_DB,
    headers: {},
  });

  axiosInstance.interceptors.request.use(
    async (config) => {
      const state = store.getState() as RootState;
      const accessToken = state.auth.accessToken;

      if (accessToken) {
        const user = jwtDecode<JwtPayload>(accessToken!);
        if (user && user.exp) {
          const currentTime = dayjs().unix();
          const tokenStartTime = user.exp; // час смерті токена
          const isExpired = currentTime > tokenStartTime;

          if (isExpired) {
            const persistedToken = state.auth.refreshToken;
            if (persistedToken) {
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
              }
            }
          } else {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
          }
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
