import axios, { AxiosResponse } from 'axios';

import { axiosInstance, createAppAsyncThunk } from '../services';

interface AsyncThunkTemplateOptions {
  queryParams?: Record<string, string>;
  nestedObjectName?: string;
}

export const requestWithInstanceTemplate = <Arg, Result>(
  name: string,
  url: string,
  method: 'get' | 'post' | 'patch' | 'delete',
) => {
  return createAppAsyncThunk<Result, Arg>(name, async (args, { rejectWithValue }) => {
    try {
      const response = await axiosInstance[method]<Result>(url, args);
      console.log(`${name}Response`, response.data);
      return response.data;
    } catch (error: any) {
      console.log(`Error ${name}`, error.response);
      return rejectWithValue(error.response.data);
    }
  });
};

// export const requestTemplate = <Arg, Result>(
//   name: string,
//     url: string,
//   method: 'get' | 'post' | 'patch' | 'delete',
//     options?: AsyncThunkTemplateOptions,
// ) => {
//   return createAppAsyncThunk<Result, Arg>(name, async (args, { rejectWithValue }) => {
//     try {
//       let requestUrl = url;

//       if (options?.queryParams) {
//         const queryParams = new URLSearchParams(options.queryParams).toString();
//         console.log('queryParams', queryParams);
//         requestUrl += queryParams ? `?${queryParams}` : '';
//       }

//       const response = await axios[method]<Result>(requestUrl, args);
//       console.log(`${name}Response`, response.data);
//       return response.data;
//     } catch (error: any) {
//       console.log(`Error ${name}`, error.response);
//       return rejectWithValue(error.response.data);
//     }
//   });
// };

export const requestTemplate = <Arg, Result>(
  name: string,
  url: string,
  method: 'get' | 'post' | 'patch' | 'delete',
  options?: AsyncThunkTemplateOptions,
) => {
  return createAppAsyncThunk<Result, Arg>(name, async (args, { rejectWithValue }) => {
    try {
      let requestUrl = url;

      if (options?.queryParams) {
        const queryParams = new URLSearchParams(options.queryParams).toString();
        requestUrl += queryParams ? `?${queryParams}` : '';
      }

      const response: AxiosResponse = await axios({
        method,
        url: requestUrl,
        data: method !== 'get' ? args : undefined,
        params: method === 'get' ? args : undefined,
        transformResponse: [
          (data) => {
            try {
              const parsedData = JSON.parse(data);

              return options?.nestedObjectName
                ? parsedData?.[options.nestedObjectName]
                : parsedData;
            } catch (error) {
              return data;
            }
          },
        ],
      });

      console.log(`${name}Response`, response.data);
      return response.data;
    } catch (error: any) {
      console.log(`Error ${name}`, error.response);
      return rejectWithValue(error.response.data);
    }
  });
};
