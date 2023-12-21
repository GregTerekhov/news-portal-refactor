import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { CONFIG } from 'config';

import { BASE_URL_NEWS } from '../services';

import { ArticleNewsArray, NewsWireArray, PopularNewsArray, C } from 'types';

interface Date {
  beginDate: string | null;
  endDate: string | null;
}

export const API_KEY = CONFIG.NEWS_API_KEY;

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

      const res = await axios.get(`${BASE_URL_NEWS}/mostpopular/v2/viewed/${pathParams}.json?`, {
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

export const fetchNewsByKeyword = createAsyncThunk<ArticleNewsArray, string, { rejectValue: any }>(
  'article/fetch',
  async (query, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL_NEWS}/search/v2/articlesearch.json?q=${query}`, {
        params: {
          'api-key': API_KEY,
        },
      });
      return res.data.response.docs as ArticleNewsArray;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchAllCategories = createAsyncThunk(
  'categories/list',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL_NEWS}/news/v3/content/section-list.json`, {
        params: {
          'api-key': API_KEY,
        },
      });
      return res.data.results as C[];
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchNewsByCategory = createAsyncThunk<NewsWireArray, string, { rejectValue: any }>(
  'categories/fetch',
  async (section, { rejectWithValue }) => {
    // console.log('source', source);
    // console.log('section: ', section);
    try {
      const res = await axios.get(`${BASE_URL_NEWS}/news/v3/content/all/${section}.json`, {
        params: {
          'api-key': API_KEY,
        },
      });
      return res.data.results as NewsWireArray;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchNewsByDate = createAsyncThunk<ArticleNewsArray, Date, { rejectValue: any }>(
  'article/fetchByDate',
  async (date, { rejectWithValue }) => {
    const { beginDate, endDate } = date;
    try {
      const res = await axios.get(
        `${BASE_URL_NEWS}/search/v2/articlesearch.json?begin_date=${beginDate}&end_date=${endDate}`,
        {
          params: {
            'api-key': API_KEY,
          },
        },
      );
      return res.data.response.docs as ArticleNewsArray;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
