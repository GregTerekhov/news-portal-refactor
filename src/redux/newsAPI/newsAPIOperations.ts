import {
  type ArticleNewsArray,
  type NewsWireArray,
  type PopularNewsArray,
  type CategoriesItem,
  type PopularRequest,
  type KeywordRequest,
  type CategoryRequest,
  type DateRequest,
  OperationName,
  HTTPMethods,
  NestedAPIObject,
  Routes,
} from 'types';

import { Config, CONFIG } from 'config';

import { requestTemplate } from '../services';

const { NEWS_API_KEY }: Config = CONFIG;

export const fetchPopularNews = requestTemplate<PopularRequest, PopularNewsArray>(
  OperationName.FetchPopular,
  Routes.PopularNews,
  HTTPMethods.GET,
  { queryParams: { 'api-key': NEWS_API_KEY }, responsePath: NestedAPIObject.NewsResults },
);

export const fetchNewsByKeyword = requestTemplate<KeywordRequest, ArticleNewsArray>(
  OperationName.FetchByKeyword,
  Routes.NewsByKeyword,
  HTTPMethods.GET,
  {
    queryParams: { 'api-key': NEWS_API_KEY },
    responsePath: NestedAPIObject.NewsArticle,
    nestedObjectName: NestedAPIObject.NewsArticleDocs,
  },
);

export const fetchAllCategories = requestTemplate<void, CategoriesItem[]>(
  OperationName.GetCategoriesList,
  Routes.CategoriesList,
  HTTPMethods.GET,
  { queryParams: { 'api-key': NEWS_API_KEY }, nestedObjectName: NestedAPIObject.NewsResults },
);

export const fetchNewsByCategory = requestTemplate<CategoryRequest, NewsWireArray>(
  OperationName.FetchByCategory,
  Routes.NewsByCategory,
  HTTPMethods.GET,
  { queryParams: { 'api-key': NEWS_API_KEY }, nestedObjectName: NestedAPIObject.NewsResults },
);

export const fetchNewsByDate = requestTemplate<DateRequest, ArticleNewsArray>(
  OperationName.FetchByDate,
  Routes.NewsByDate,
  HTTPMethods.GET,
  {
    queryParams: { 'api-key': NEWS_API_KEY },
    responsePath: NestedAPIObject.NewsArticle,
    nestedObjectName: NestedAPIObject.NewsArticleDocs,
  },
);
