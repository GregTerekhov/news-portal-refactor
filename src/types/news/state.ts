import type { IHistoryLog, PartialVotedNewsArray } from './newsDBResponse';
import type {
  ArticleNewsArray,
  CategoriesItem,
  NewsWireArray,
  PopularNewsArray,
} from './newsAPIResponse';

type additionalResultsState = 'idle' | 'full' | 'empty';

export interface newsAPIState {
  popular: PopularNewsArray;
  searchByWord: ArticleNewsArray;
  categories: NewsWireArray;
  categoriesList: CategoriesItem[];
  searchByDate: ArticleNewsArray;
  isLoading: boolean;
  hasError: number | null;
  headline: string;
  hasResults: additionalResultsState;
}

export interface NewsDBState {
  message: string;
  savedNews: PartialVotedNewsArray;
  favourites: PartialVotedNewsArray;
  reads: PartialVotedNewsArray;
  archivedNews: PartialVotedNewsArray;
  historyLog: IHistoryLog[];
  isLoading: boolean;
  hasError: number | string | null;
}
