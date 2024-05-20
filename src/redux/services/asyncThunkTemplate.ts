import axios, { AxiosResponse } from 'axios';

import { type AsyncThunkTemplateOptions, HTTPMethods, OperationName, Routes } from 'types';

import { getDynamicUrl, getErrorMessage, getFinalUrl, transformDataResponse } from './helpers';
import { axiosInstance, createAppAsyncThunk } from '../services';

export const requestTemplate = <Arg, Result>(
  name: OperationName,
  url: Routes,
  method: HTTPMethods,
  options?: AsyncThunkTemplateOptions,
) => {
  return createAppAsyncThunk<Result, Arg>(name, async (args, { rejectWithValue }) => {
    try {
      let requestUrl = getFinalUrl(name, url, args, options);

      const dynamicRow = url.includes('period') || url.includes('section');

      const response: AxiosResponse = await axios({
        method,
        url: requestUrl,
        data: method !== HTTPMethods.GET ? args : undefined,
        params: method === HTTPMethods.GET && !dynamicRow ? args : undefined,
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

      // після transformResponse сюди потрапляють всі необхідні дані в одному рівні вкладеності в об'єкт response.data
      console.log(`${name} response: `, response);
      return response.data;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);

      return rejectWithValue(errorMessage);
    }
  });
};

export const requestWithInstanceTemplate = <Arg, Result>(
  name: OperationName,
  url: Routes,
  method: HTTPMethods,
) => {
  return createAppAsyncThunk<Result, Arg>(name, async (args, { rejectWithValue }) => {
    try {
      const dynamicUrl = getDynamicUrl(args, url);

      const response = await axiosInstance[method]<Result>(dynamicUrl, args);
      return response.data;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);

      return rejectWithValue(errorMessage);
    }
  });
};
