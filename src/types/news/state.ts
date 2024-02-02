import { SerializedError } from '@reduxjs/toolkit';

import { IHistoryLog, PartialVotedNewsArray } from './newsDBResponse';
import {
  ArticleNewsArray,
  CategoriesItem,
  NewsWireArray,
  PopularNewsArray,
} from './newsAPIResponse';

export interface newsAPIState {
  popular: PopularNewsArray;
  searchByWord: ArticleNewsArray;
  categories: NewsWireArray;
  categoriesList: CategoriesItem[];
  searchByDate: ArticleNewsArray;
  isLoading: boolean;
  hasError: number | null;
  headline: string;
}

export interface NewsDBState {
  savedNews: PartialVotedNewsArray;
  favourites: PartialVotedNewsArray;
  reads: PartialVotedNewsArray;
  archivedNews: PartialVotedNewsArray;
  historyLog: IHistoryLog[];
  isLoading: boolean;
  hasError: SerializedError | null;
}
