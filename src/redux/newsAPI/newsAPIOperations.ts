import { CONFIG } from 'config';

import { requestTemplate } from '../services';

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

export const fetchPopularNews = requestTemplate<PopularRequest, PopularNewsArray>(
  'apiNews/popular/fetch',
  '/mostpopular/v2/viewed/:period.json',
  'get',
  { queryParams: { 'api-key': API_KEY }, responsePath: 'results' },
);

export const fetchNewsByKeyword = requestTemplate<KeywordRequest, ArticleNewsArray>(
  'apiNews/article/fetch',
  '/search/v2/articlesearch.json',
  'get',
  { queryParams: { 'api-key': API_KEY }, responsePath: 'response', nestedObjectName: 'docs' },
);

export const fetchAllCategories = requestTemplate<void, CategoriesItem[]>(
  'apiNews/categories/list',
  '/news/v3/content/section-list.json',
  'get',
  { queryParams: { 'api-key': API_KEY }, nestedObjectName: 'results' },
);

export const fetchNewsByCategory = requestTemplate<CategoryRequest, NewsWireArray>(
  'apiNews/categories/fetch',
  '/news/v3/content/all/:section.json',
  'get',
  { queryParams: { 'api-key': API_KEY }, nestedObjectName: 'results' },
);

export const fetchNewsByDate = requestTemplate<DateRequest, ArticleNewsArray>(
  'apiNews/article/fetchByDate',
  '/search/v2/articlesearch.json',
  'get',
  { queryParams: { 'api-key': API_KEY }, responsePath: 'response', nestedObjectName: 'docs' },
);
