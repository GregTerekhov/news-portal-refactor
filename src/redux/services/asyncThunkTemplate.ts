import axios, { AxiosResponse } from 'axios';

import { axiosInstance, createAppAsyncThunk } from '../services';

import { getDynamicUrl, getErrorMessage, getFinalUrl, transformDataResponse } from './helpers';
import type { AsyncThunkTemplateOptions, UsedMethods } from 'types';

export const requestTemplate = <Arg, Result>(
  name: string,
  url: string,
  method: UsedMethods,
  options?: AsyncThunkTemplateOptions,
) => {
  return createAppAsyncThunk<Result, Arg>(name, async (args, { rejectWithValue }) => {
    try {
      let requestUrl = getFinalUrl(name, url, args, options);

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
          async (data) => {
            try {
              return await transformDataResponse(data, options);
            } catch (error) {
              return data;
            }
          },
        ],
      });

      // console.log(`${name}Response`, response);
      // після transformResponse сюди потрапляють всі необхідні дані в одному рівні вкладеності в об'єкт response.data
      return response.data;
    } catch (error: any) {
      console.log(`Error ${name}`, error.response);
      const errorMessage = getErrorMessage(error);

      return rejectWithValue(errorMessage);
    }
  });
};

export const requestWithInstanceTemplate = <Arg, Result>(
  name: string,
  url: string,
  method: UsedMethods,
) => {
  return createAppAsyncThunk<Result, Arg>(name, async (args, { rejectWithValue }) => {
    try {
      let dynamicUrl = getDynamicUrl(args, url);

      const response = await axiosInstance[method]<Result>(dynamicUrl, args);
      // console.log(`${name}Response`, response);
      return response.data;
    } catch (error: any) {
      // console.log(`Error ${name}`, error.response);

      const errorMessage = getErrorMessage(error);

      return rejectWithValue(errorMessage);
    }
  });
};
