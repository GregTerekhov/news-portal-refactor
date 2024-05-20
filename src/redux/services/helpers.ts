import axios from 'axios';
import dayjs from 'dayjs';
import { JwtPayload } from 'jwt-decode';

import { Config, CONFIG } from 'config';
import { store, RootState } from '../store';

import {
  ErrorCase,
  OperationName,
  Routes,
  SliceName,
  type AsyncThunkTemplateOptions,
  type QueryParams,
  type RefreshTokensResponse,
  type TokensPayload,
} from 'types';

const { BASE_URL_DB, BASE_URL_NEWS, BASE_URL_WEATHER }: Config = CONFIG;

function getBaseRequestUrl(name: OperationName, url: Routes): string {
  switch (true) {
    case name.includes(SliceName.Auth):
      return `${BASE_URL_DB}${url}`;
    case name.includes(SliceName.APINews):
      return `${BASE_URL_NEWS}${url}`;
    case name.includes(SliceName.Weather):
      return `${BASE_URL_WEATHER}${url}`;

    default:
      return '';
  }
}

function changeUrl(
  url: string,
  key: string,
  value: string | number,
  isTransform?: boolean,
): string {
  return isTransform
    ? url.replace(`:${key}`, value.toString().toLowerCase())
    : url.replace(`:${key}`, value.toString());
}

function replaceQueryStringInUrl(args: any, name: OperationName, url: Routes): string {
  let requestUrl = getBaseRequestUrl(name, url);

  if (args) {
    if (args === 'Multimedia/Photos') {
      args = 'Multimedia';
    }

    // Додавання динамічних даних до URL
    if (typeof args === 'object') {
      Object.entries(args).forEach(([key, value]) => {
        if (typeof value === 'string' || typeof value === 'number') {
          return (requestUrl = changeUrl(requestUrl, key, value));
        }
        return requestUrl;
      });
    } else if (typeof args === 'string') {
      return (requestUrl = changeUrl(requestUrl, 'section', args, true));
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
  name: OperationName,
  url: Routes,
  args: any,
  options?: AsyncThunkTemplateOptions | undefined,
): string {
  return `${replaceQueryStringInUrl(args, name, url)}${addQueryParams(options)}`.trim();
}

export function getDynamicUrl(args: any, url: Routes): Routes | string {
  let dynamicUrl = '';

  const shouldChangeUrl = typeof args === 'string' && url.includes('_id');

  if (shouldChangeUrl) dynamicUrl = url.replace(/_id\b/, args.toString());

  return !shouldChangeUrl ? url : dynamicUrl;
}

export async function transformDataResponse(
  data: any,
  options?: AsyncThunkTemplateOptions | undefined,
): Promise<any> {
  const parsedData = JSON.parse(data);

  // Виводимо, якщо є responsePath - для варіантів, коли є вкладеність необхідних даних більше, ніж два рівня після response.data
  const resultData = options?.responsePath ? parsedData?.[options.responsePath] : parsedData;

  // Виводимо, якщо є nestedObjectName - для варіантів, коли є вкладеність необхідних даних на один рівень нижче response.data
  return options?.nestedObjectName ? resultData?.[options.nestedObjectName] : resultData;
}

const MAX_RETRY_COUNT = 3; // кількість спроб рекурсивного виклику фукнції запиту токенів
const RETRY_DELAY = 3000; //затримка перед наступним запитом

let retryTimeout: NodeJS.Timeout | null = null;

export const updateTokens = async (retryCount = 0): Promise<TokensPayload> => {
  const state = store.getState() as RootState;
  const persistedToken = state.auth.refreshToken;

  if (!persistedToken) {
    throw new Error('Refresh token is missing');
  }

  try {
    const response = await axios.post<RefreshTokensResponse>(`${BASE_URL_DB}${Routes.Refresh}`, {
      refreshToken: persistedToken,
    });

    return response.data.data;
  } catch (error) {
    console.error('Token refreshing error', error);

    // Очищення таймера перед наступним спробою
    if (retryTimeout) {
      clearTimeout(retryTimeout);
    }
    // Перевірка, чи є ще спроби ретримування і якщо є, робимо рекурсивний виклик з затримкою
    if (retryCount < MAX_RETRY_COUNT) {
      retryTimeout = setTimeout(() => {
        retryTimeout = null; // Очищення таймера після його виклику
        updateTokens(retryCount + 1);
      }, RETRY_DELAY);
      return updateTokens(retryCount + 1);
    } else {
      // Досягнуто максимальну кількість спроб, кидаємо помилку
      throw new Error('Maximum retry attempts reached');
    }
  }
};

export const isTokenExpired = (tokenStatus: JwtPayload): boolean | undefined => {
  const currentTime = dayjs().unix();
  const tokenExpiryTime = tokenStatus.exp;
  if (tokenExpiryTime) return currentTime > tokenExpiryTime;

  return undefined;
};

export const getErrorMessage = (error: any): string | number => {
  if (
    error.response.status &&
    (error.response.status >= 500 || error.response.status === ErrorCase.TooManyRequest)
  ) {
    return error.response.status;
  } else if (error.response.data && typeof error.response.data.message === 'string') {
    return error.response.data.message;
  } else if (error.response.cod && error.response.cod >= 500) {
    return error.response.cod;
  } else {
    return 'Unknown error';
  }
};
