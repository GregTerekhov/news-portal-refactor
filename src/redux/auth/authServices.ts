import axios, { AxiosInstance } from 'axios';
import dayjs from 'dayjs';
import { jwtDecode, JwtPayload } from 'jwt-decode';

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
      // const state = store.getState() as RootState;
      // const accessToken = state.auth.accessToken;
      // console.log(accessToken);
      // if (!accessToken) {
      //   const accessToken = state.auth.accessToken;

      //   config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : '';
      // }
      // const user = jwtDecode<JwtPayload>(accessToken!);
      // console.log(user);
      // const isExpired = user && user.exp && dayjs.unix(user.exp).diff(dayjs()) < 3_600_000;

      // console.log('isExpired: ', isExpired);
      // if (!isExpired) return config;

      // const persistedToken = state.auth.refreshToken;
      // console.log(persistedToken);
      // const response = await axios.post<RefreshResponse>(`${baseURL}/auth/refresh`, {
      //   refreshToken: persistedToken,
      // });

      // setTokens(response.data);
      // config.headers.Authorization = `Bearer ${response.data.accessToken}`;

      // // console.log('config', config);
      // return config;

      const state = store.getState() as RootState;
      const accessToken = state.auth.accessToken;

      if (!config.headers['Authorization']) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  axiosInstance.interceptors.response.use(
    async (response) => response,
    async (error) => {
      const originalRequest = error?.config;
      // console.log('originalRequest', originalRequest);
      const publicRequests =
        originalRequest.url === '/auth/sign-in' ||
        originalRequest.url === '/auth/forgot-password-request' ||
        originalRequest.url === '/auth/forgot-password-change';

      if (!publicRequests && error.response) {
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          originalRequest.url = '/auth/refresh';
          const state = store.getState() as RootState;
          const persistedToken = state.auth.refreshToken;

          try {
            const response = await axios.post<RefreshResponse>(`${baseURL}/auth/refresh`, {
              refreshToken: persistedToken,
            });
            // console.log('response.dataTokens', response.data);

            setTokens(response.data);
            originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
            // console.log(
            //   ' originalRequest.headers["Authorization"]',
            //   originalRequest.headers['Authorization'],
            // );
            return axiosInstance(originalRequest);
          } catch (error) {
            console.error('Error refreshing tokens: ', error);
            setTokens({ accessToken: null, refreshToken: null });
            window.location.href = '/';
            return Promise.reject(error);
          }
        }
        if (error.response.status === 403 && error.response.data) {
          return Promise.reject(error.response.data);
        }
      }
      return Promise.reject(error);
    },
  );
  return axiosInstance;
};

const axiosInstance = createAxiosInstance();

export default axiosInstance;
