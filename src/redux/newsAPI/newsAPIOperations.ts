import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://api.nytimes.com/svc';
const API_KEY = 'uGHJWsajhmnJg2AMcnCD9YXkamMpVOHo';

type PopularItem = {
  abstract: string;
  id: string;
  media: {
    'media-metadata': {
      url: string;
    }[];
  }[];
  published_date: string;
  section: string;
  source: string;
  title: string;
  type: string;
  url: string;
};

export const fetchPopularNews = createAsyncThunk<PopularItem[], void, { rejectValue: any }>(
  'popular/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/mostpopular/v2/viewed/30.json?`, {
        params: {
          'api-key': API_KEY,
        },
      });
      return res.data.results as PopularItem[];
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
