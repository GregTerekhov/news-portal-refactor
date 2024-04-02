import axios from 'axios';
import dayjs from 'dayjs';
import { JwtPayload } from 'jwt-decode';

import { CONFIG } from 'config';
import { store, RootState } from '../store';
import { setTokens } from '../auth';

import type { RefreshTokensResponse } from 'types';

type QueryParams = Record<string, string | object | number>;

export function getRequestUrl(name: string, url: string): string {
  let requestUrl = '';

  switch (true) {
    case name.includes('auth'):
      requestUrl = `${CONFIG.BASE_URL_DB}` + url;
      break;
    case name.includes('apiNews'):
      requestUrl = `${CONFIG.BASE_URL_NEWS}` + url;
      break;
    case name.includes('weather'):
      requestUrl = `${CONFIG.BASE_URL_WEATHER}` + url;
      break;

    default:
      break;
  }

  return requestUrl;
}

export const serializeParams = (params: QueryParams): string => {
  if (params && typeof params === 'object') {
    return Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
      .join('&');
  }
  return '';
};

export const updateTokens = async (): Promise<void> => {
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

export const isTokenExpired = (tokenStatus: JwtPayload): boolean | undefined => {
  const currentTime = dayjs().unix();
  const tokenExpiryTime = tokenStatus.exp;
  if (tokenExpiryTime) return currentTime > tokenExpiryTime;

  return undefined;
};
