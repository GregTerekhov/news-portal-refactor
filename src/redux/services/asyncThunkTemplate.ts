import axios, { AxiosResponse } from 'axios';

import { axiosInstance, createAppAsyncThunk } from '../services';

type QueryParams = Record<string, string | object | number>;

interface AsyncThunkTemplateOptions {
  queryParams?: QueryParams;
  nestedObjectName?: string;
  responsePath?: string;
}

const serializeParams = (params: QueryParams): string => {
  console.log('PARAMS into serializeParams', typeof params, params);
  if (params && typeof params === 'object') {
    const serializedParams = Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
      .join('&');
    return serializedParams;
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
      let requestUrl = url;

      // Додавання динамічних даних до URL
      if (args) {
        if (typeof args === 'object') {
          Object.entries(args).forEach(([key, value]) => {
            requestUrl = url.replace(`:${key}`, value.toString());
            console.log('requestUrlInCondARGS=OBJ', requestUrl);
          });
        } else if (typeof args === 'string' || typeof args === 'number') {
          requestUrl = url.replace(':value', args.toString());
          console.log('requestUrlInCondARGS=STR', requestUrl);
        }
      }

      if (options?.queryParams) {
        const queryParams = serializeParams(options.queryParams);
        requestUrl += queryParams ? `?${queryParams}` : '';
      }

      const response: AxiosResponse = await axios({
        method,
        url: requestUrl,
        data: method !== 'get' ? args : undefined,
        params: method === 'get' ? args : undefined,
        headers: {
          'Content-Type': 'application/json',
        },
        transformResponse: [
          (data) => {
            try {
              const parsedData = JSON.parse(data);
              console.log('parsedData', parsedData);
              console.log('url intoRESPONSE', url);

              // Виводимо, якщо є responsePath - для варіантів, коли є вкладеність необхідних даних більше, ніж два рівня після response.data
              const resultData = options?.responsePath
                ? parsedData?.[options.responsePath]
                : parsedData;
              console.log('resultData', resultData);

              // Виводимо, якщо є nestedObjectName - для варіантів, коли є вкладеність необхідних даних на один рівень нижче response.data
              const finalData = options?.nestedObjectName
                ? resultData?.[options.nestedObjectName]
                : resultData;

              console.log('finalData', finalData);
              return finalData;
            } catch (error) {
              return data;
            }
          },
        ],
      });

      console.log(`${name}Response`, response.data);
      // після transformResponse сюди потрапляють всі необхідні дані в одному рівні вкладеності в об'єкт response.data
      return response.data;
    } catch (error: any) {
      if (error && error.response?.data) {
        console.log(`Error ${name}`, error.response.data);
        return rejectWithValue(error.response.data);
      }
      if (error && error.response?.status) {
        console.log(`Error ${name}`, error.response);
        return rejectWithValue(error.response.status);
      }
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
      return rejectWithValue(error.response.data);
    }
  });
};
