import axios from 'axios';

import { CONFIG } from 'config';

import { BASE_URL_NEWS, createAppAsyncThunk } from '../services';

import {
  ArticleNewsArray,
  NewsWireArray,
  PopularNewsArray,
  CategoriesItem,
  PopularRequest,
  KeywordRequest,
  CategoryRequest,
  DateRequest,
} from 'types';

const API_KEY = CONFIG.NEWS_API_KEY;

export const fetchPopularNews = createAppAsyncThunk<
  PopularNewsArray,
  PopularRequest,
  { rejectValue: any }
>('popular/fetch', async (period, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${BASE_URL_NEWS}/mostpopular/v2/viewed/${period}.json?`, {
      params: {
        'api-key': API_KEY,
      },
    });
    return data.results;
  } catch (error: any) {
    console.log(error.response);
    return rejectWithValue(error.response.status);
  }
});

export const fetchNewsByKeyword = createAppAsyncThunk<
  ArticleNewsArray,
  KeywordRequest,
  { rejectValue: any }
>('article/fetch', async (query, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${BASE_URL_NEWS}/search/v2/articlesearch.json?q=${query}`, {
      params: {
        'api-key': API_KEY,
      },
    });
    return res.data.response.docs;
  } catch (error: any) {
    console.log(error);
    return rejectWithValue(error.response.status);
  }
});

export const fetchAllCategories = createAppAsyncThunk<CategoriesItem[], void>(
  'categories/list',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL_NEWS}/news/v3/content/section-list.json`, {
        params: {
          'api-key': API_KEY,
        },
      });
      return res.data.results;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchNewsByCategory = createAppAsyncThunk<
  NewsWireArray,
  CategoryRequest,
  { rejectValue: any }
>('categories/fetch', async (section, { rejectWithValue }) => {
  // console.log('source', source);
  // console.log('section: ', section);
  try {
    const res = await axios.get(`${BASE_URL_NEWS}/news/v3/content/all/${section}.json`, {
      params: {
        'api-key': API_KEY,
      },
    });
    return res.data.results;
  } catch (error: any) {
    console.log(error);
    return rejectWithValue(error.response.status);
  }
});

export const fetchNewsByDate = createAppAsyncThunk<
  ArticleNewsArray,
  DateRequest,
  { rejectValue: any }
>('article/fetchByDate', async (date, { rejectWithValue }) => {
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
    return res.data.response.docs;
  } catch (error: any) {
    console.log(error);
    return rejectWithValue(error.response.status);
  }
});
