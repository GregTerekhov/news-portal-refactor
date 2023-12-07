import axios, { AxiosInstance } from 'axios';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import dayjs from 'dayjs';

import store, { RootState } from 'reduxStore/store';
import { setTokens } from './authSlice';

interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

const baseURL = 'https://news-webapp-express.onrender.com/api';

const createAxiosInstance = () => {
  const axiosInstance: AxiosInstance = axios.create({
    baseURL,
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

            try {
              const response = await axios.post<RefreshResponse>(`${baseURL}/auth/refresh`, {
                refreshToken: persistedToken,
              });

              store.dispatch(setTokens(response.data));
              config.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
            } catch (error) {
              console.error('Token refreshing error', error);
            }
          } else {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
          }
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  return axiosInstance;
};

const axiosInstance = createAxiosInstance();

export default axiosInstance;
