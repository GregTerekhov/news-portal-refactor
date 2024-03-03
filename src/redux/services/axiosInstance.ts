import axios, { AxiosInstance } from 'axios';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import dayjs from 'dayjs';

import { store, RootState } from '../store';
import { CONFIG } from 'config';
import { setTokens } from '../auth';

import { RefreshTokensResponse } from 'types';

const createAxiosInstance = () => {
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: CONFIG.BASE_URL_DB,
  });

  console.log('BASE_URL_DB', CONFIG.BASE_URL_DB);

  axiosInstance.interceptors.request.use(
    async (config) => {
      const state = store.getState() as RootState;
      const accessToken = state.auth.accessToken;
      console.log('accessToken', accessToken);

      const isAuthenticated: boolean = state.auth.isLoggedIn;

      if (!(accessToken && isAuthenticated)) {
        throw new Error('User is not authenticated');
      }

      const tokenStatus = jwtDecode<JwtPayload>(accessToken!);

      if (tokenStatus && tokenStatus.exp) {
        console.log(tokenStatus.exp);
        const currentTime = dayjs().unix();
        const tokenExpiryTime = tokenStatus.exp; // час смерті токена
        console.log('currentTime', currentTime);
        console.log('tokenExpiryTime', tokenExpiryTime);
        const isExpired = currentTime > tokenExpiryTime;
        console.log('TOKEN isExpired', isExpired);

        if (isExpired) {
          const persistedToken = state.auth.refreshToken;
          console.log('refreshToken', persistedToken);
          if (!persistedToken) {
            throw new Error('Refresh token is missing');
          }
          try {
            const response = await axios.post<RefreshTokensResponse>(
              `${CONFIG.BASE_URL_DB}/auth/refresh`,
              {
                refreshToken: persistedToken,
              },
            );
            console.log('response after REFRESH', response.data);
            store.dispatch(setTokens(response.data.data));
          } catch (error) {
            console.error('Token refreshing error', error);
            return Promise.reject(error);
          }
        } else {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
          console.log('config.headers["Authorization"]', config.headers['Authorization']);
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
