import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ArticleNewsArray, NewsWireArray, PopularNewsArray, C } from 'types';

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

export const fetchNewsByKeyword = createAsyncThunk<ArticleNewsArray, string, { rejectValue: any }>(
  'article/fetch',
  async (query, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/search/v2/articlesearch.json?q=${query}`, {
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
      const res = await axios.get(`${BASE_URL}/news/v3/content/section-list.json`, {
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
    console.log('section: ', section);
    try {
      const res = await axios.get(`${BASE_URL}/news/v3/content/all/${section}.json`, {
        params: {
          'api-key': API_KEY,
        },
      });
      console.log('fetchNewsByCategory', res.data.results);
      return res.data.results as NewsWireArray;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchNewsByDate = createAsyncThunk<ArticleNewsArray, string, { rejectValue: any }>(
  'article/fetchByDate',
  async (date, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/search/v2/articlesearch.json?begin_date=${date}&end_date=${date}`,
        {
          params: {
            'api-key': API_KEY,
          },
        },
      );
      return res.data.response.docs;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

// export const fetchNewsByTypeOfMaterials = createAsyncThunk('types/fetch', async (type, { rejectWithValue }) => {
//   try {
//     const res = await axios.get(`${BASE_URL}/search/v2/articlesearch.json?facet=true&facet_field=`);
//     return res
//   } catch (error: any) {
//       return rejectWithValue(error.response.data)
//   }
// })
