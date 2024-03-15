import axios, { AxiosResponse } from 'axios';

import { axiosInstance, createAppAsyncThunk } from '../services';

import { CONFIG } from 'config';

type QueryParams = Record<string, string | object | number>;

interface AsyncThunkTemplateOptions {
  queryParams?: QueryParams;
  nestedObjectName?: string;
  responsePath?: string;
}

const serializeParams = (params: QueryParams): string => {
  if (params && typeof params === 'object') {
    return Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
      .join('&');
  }
  return '';
};

export const requestTemplate = <Arg, Result>(
  name: string,
  url: string,
  method: 'get' | 'post' | 'patch' | 'delete',
  options?: AsyncThunkTemplateOptions,
) => {
  return createAppAsyncThunk<Result, Arg>(name, async (args, { rejectWithValue }) => {
    try {
      let requestUrl = '';

      // Динамічне додавання базового URL
      if (name.includes('auth')) {
        requestUrl = `${CONFIG.BASE_URL_DB}` + url;
      } else if (name.includes('apiNews')) {
        requestUrl = `${CONFIG.BASE_URL_NEWS}` + url;
      } else if (name.includes('weather')) {
        requestUrl = `${CONFIG.BASE_URL_WEATHER}` + url;
      }

      if (args) {
        // Додавання динамічних даних до URL
        if (typeof args === 'object') {
          Object.entries(args).forEach(([key, value]) => {
            requestUrl = requestUrl.replace(`:${key}`, value.toString());
          });
        } else if (typeof args === 'string') {
          requestUrl = requestUrl.replace(':section', args.toString().toLowerCase());
        }
      }
      // додавання query params до url
      if (options?.queryParams) {
        const queryParams = serializeParams(options.queryParams);
        requestUrl += queryParams ? `?${queryParams}` : '';
      }

      const dynamicRow = url.includes('period') || url.includes('section');

      const response: AxiosResponse = await axios({
        method,
        url: requestUrl,
        data: method !== 'get' ? args : undefined,
        params: method === 'get' && !dynamicRow ? args : undefined,
        headers: {
          'Content-Type': 'application/json',
        },
        transformResponse: [
          (data) => {
            try {
              const parsedData = JSON.parse(data);

              // Виводимо, якщо є responsePath - для варіантів, коли є вкладеність необхідних даних більше, ніж два рівня після response.data
              const resultData = options?.responsePath
                ? parsedData?.[options.responsePath]
                : parsedData;

              // Виводимо, якщо є nestedObjectName - для варіантів, коли є вкладеність необхідних даних на один рівень нижче response.data
              const finalData = options?.nestedObjectName
                ? resultData?.[options.nestedObjectName]
                : resultData;

              return finalData;
            } catch (error) {
              return data;
            }
          },
        ],
      });

      console.log(`${name}Response`, response);
      // після transformResponse сюди потрапляють всі необхідні дані в одному рівні вкладеності в об'єкт response.data
      return response.data;
    } catch (error: any) {
      console.log(`Error ${name}`, error.response);
      return rejectWithValue(
        error.response?.status || error.response?.data?.message || 'Unknown error',
      );
    }
  });
};

export const requestWithInstanceTemplate = <Arg, Result>(
  name: string,
  url: string,
  method: 'get' | 'post' | 'patch' | 'delete',
) => {
  return createAppAsyncThunk<Result, Arg>(name, async (args, { rejectWithValue }) => {
    try {
      let dynamicUrl = args ? url.replace(/:id\b/, args.toString()) : url;

      const response = await axiosInstance[method]<Result>(dynamicUrl, args);
      console.log(`${name}Response`, response.data);
      return response.data;
    } catch (error: any) {
      console.log(`Error ${name}`, error.response);
      return rejectWithValue(error.response.data.message || 'Unknown error');
    }
  });
};
