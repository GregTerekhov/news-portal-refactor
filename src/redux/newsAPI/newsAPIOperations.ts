import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PopularNewsArray } from 'types';

const BASE_URL = 'https://api.nytimes.com/svc';
export const API_KEY = 'uGHJWsajhmnJg2AMcnCD9YXkamMpVOHo';

export const fetchPopularNews = createAsyncThunk<PopularNewsArray, string, { rejectValue: any }>(
  'popular/fetch',
  async (period, { rejectWithValue }) => {
    try {
      let pathParams = '1';

      if (period === '30') {
        pathParams = '30';
      } else if (period === '7') {
        pathParams = '7';
      }

      const res = await axios.get(`${BASE_URL}/mostpopular/v2/viewed/${pathParams}.json?`, {
        params: {
          'api-key': API_KEY,
        },
      });
      return res.data.results as PopularNewsArray;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
