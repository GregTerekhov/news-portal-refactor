import axios from 'axios';

import { CONFIG } from 'config';

import { createAppAsyncThunk, requestTemplate } from '../services';

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

// export const fetchPopularNews = requestTemplate<PopularRequest, PopularNewsArray>(
//   'popular/fetch',
//   `${CONFIG.BASE_URL_NEWS}/mostpopular/v2/viewed/:value.json`,
//   'get',
//   { queryParams: { 'api-key': API_KEY }, nestedObjectName: 'results' },
// );

export const fetchPopularNews = createAppAsyncThunk<
  PopularNewsArray,
  PopularRequest,
  { rejectValue: any }
>('popular/fetch', async (period, { rejectWithValue }) => {
  try {
    let url = `${CONFIG.BASE_URL_NEWS}/mostpopular/v2/viewed/${period}.json`;
    console.log('url', url);
    const response = await axios.get(url, {
      params: {
        'api-key': API_KEY,
      },
    });
    return response.data.results;
  } catch (error: any) {
    console.log(error);
    return rejectWithValue(error.response.status);
  }
});

export const fetchNewsByKeyword = requestTemplate<KeywordRequest, ArticleNewsArray>(
  'article/fetch',
  `${CONFIG.BASE_URL_NEWS}/search/v2/articlesearch.json`,
  'get',
  { queryParams: { 'api-key': API_KEY }, responsePath: 'response', nestedObjectName: 'docs' },
);

// export const fetchNewsByKeyword = createAppAsyncThunk<
//   ArticleNewsArray,
//   KeywordRequest,
//   { rejectValue: any }
// >('article/fetch', async (query, { rejectWithValue }) => {
//   try {
//     const res = await axios.get(`${CONFIG.BASE_URL_NEWS}/search/v2/articlesearch.json`, {
//       params: {
//         'api-key': API_KEY,
//         q: query,
//       },
//     });
//     console.log('res.data', res);
//     return res.data.response.docs;
//   } catch (error: any) {
//     console.log(error);
//     return rejectWithValue(error.response.status);
//   }
// });

export const fetchAllCategories = requestTemplate<void, CategoriesItem[]>(
  'categories/list',
  `${CONFIG.BASE_URL_NEWS}/news/v3/content/section-list.json`,
  'get',
  { queryParams: { 'api-key': API_KEY }, nestedObjectName: 'results' },
);

// export const fetchAllCategories = createAppAsyncThunk<CategoriesItem[], void>(
//   'categories/list',
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await axios.get(`${CONFIG.BASE_URL_NEWS}/news/v3/content/section-list.json`, {
//         params: {
//           'api-key': API_KEY,
//         },
//       });
//       return res.data.results;
//     } catch (error: any) {
//       return rejectWithValue(error.response.status);
//     }
//   },
// );

// export const fetchNewsByCategory = requestTemplate<CategoryRequest, NewsWireArray>(
//   'categories/fetch',
//   `${CONFIG.BASE_URL_NEWS}/news/v3/content/all/:value.json`,
//   'get',
//   { queryParams: { 'api-key': API_KEY }, responsePath: 'results' },
// );

export const fetchNewsByCategory = createAppAsyncThunk<
  NewsWireArray,
  CategoryRequest,
  { rejectValue: any }
>('categories/fetch', async (section, { rejectWithValue }) => {
  // console.log('source', source);
  // console.log('section: ', section);
  try {
    const res = await axios.get(`${CONFIG.BASE_URL_NEWS}/news/v3/content/all/${section}.json`, {
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

export const fetchNewsByDate = requestTemplate<DateRequest, ArticleNewsArray>(
  'article/fetchByDate',
  `${CONFIG.BASE_URL_NEWS}/search/v2/articlesearch.json`,
  'get',
  { queryParams: { 'api-key': API_KEY }, responsePath: 'response', nestedObjectName: 'docs' },
);

// export const fetchNewsByDate = createAppAsyncThunk<
//   ArticleNewsArray,
//   DateRequest,
//   { rejectValue: any }
// >('article/fetchByDate', async (date, { rejectWithValue }) => {
//   const { beginDate, endDate } = date;
//   try {
//     const res = await axios.get(`${CONFIG.BASE_URL_NEWS}/search/v2/articlesearch.json`, {
//       params: {
//         'api-key': API_KEY,
//         begin_date: beginDate,
//         end_date: endDate,
//       },
//     });
//     return res.data.response.docs;
//   } catch (error: any) {
//     console.log(error);
//     return rejectWithValue(error.response.status);
//   }
// });
