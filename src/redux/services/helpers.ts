import axios from 'axios';
import dayjs from 'dayjs';
import { JwtPayload } from 'jwt-decode';

import { CONFIG } from 'config';
import { store, RootState } from '../store';
import { setTokens } from '../auth';

import type { RefreshTokensResponse } from 'types';
import type { AsyncThunkTemplateOptions, QueryParams } from './types';

function getBaseRequestUrl(name: string, url: string): string {
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

function replaceQueryStringInUrl(args: any, name: string, url: string): string {
  let requestUrl = getBaseRequestUrl(name, url);

  if (args) {
    // Додавання динамічних даних до URL
    if (typeof args === 'object') {
      Object.entries(args).forEach(([key, value]) => {
        if (typeof value === 'string' || typeof value === 'number') {
          return (requestUrl = requestUrl.replace(`:${key}`, value.toString()));
        }
        return requestUrl;
      });
    } else if (typeof args === 'string') {
      return (requestUrl = requestUrl.replace(':section', args.toString().toLowerCase()));
    }
  }

  return requestUrl;
}

function serializeParams(params: QueryParams): string {
  if (params && typeof params === 'object') {
    return Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
      .join('&');
  }
  return '';
}

function addQueryParams(options?: AsyncThunkTemplateOptions | undefined): string {
  let requestUrl = '';
  // додавання query params до url
  if (options?.queryParams) {
    const queryParams = serializeParams(options.queryParams);
    return (requestUrl += queryParams ? `?${queryParams}` : '');
  }

  return requestUrl;
}

export function getFinalUrl(
  name: string,
  url: string,
  args: any,
  options?: AsyncThunkTemplateOptions | undefined,
): string {
  return (replaceQueryStringInUrl(args, name, url) + addQueryParams(options)).trim();
}

export function getDynamicUrl(args: any, url: string): string {
  let dynamicUrl = url;

  if (args && typeof args === 'string' && url.includes('_id')) {
    dynamicUrl = url.replace(/_id\b/, args.toString());
  }

  return dynamicUrl;
}

export async function transformDataResponse(
  data: any,
  options?: AsyncThunkTemplateOptions | undefined,
): Promise<any> {
  const parsedData = JSON.parse(data);

  // Виводимо, якщо є responsePath - для варіантів, коли є вкладеність необхідних даних більше, ніж два рівня після response.data
  const resultData = options?.responsePath ? parsedData?.[options.responsePath] : parsedData;

  // Виводимо, якщо є nestedObjectName - для варіантів, коли є вкладеність необхідних даних на один рівень нижче response.data
  const finalData = options?.nestedObjectName ? resultData?.[options.nestedObjectName] : resultData;

  return finalData;
}

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
