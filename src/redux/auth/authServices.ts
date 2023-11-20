import axios from 'axios';

import store, { RootState } from 'reduxStore/store';
import { setTokens } from './authSlice';

interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

const axiosInstance = axios.create({
  baseURL: 'https://news-webapp-express.onrender.com/api',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState() as RootState;
    const accessToken = state.auth.accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
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
    const originalRequest = error.config;

    if (originalRequest.url !== '/auth/sign-in' && error.response) {
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const state = store.getState() as RootState;
        const persistedToken = state.auth.refreshToken;

        try {
          const response = await axios.post<RefreshResponse>('/auth/refresh', {
            refreshToken: persistedToken,
          });

          setTokens(response.data);
          originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;

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

export default axiosInstance;
