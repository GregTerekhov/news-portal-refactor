import {
  ResultsState,
  type ArticleNewsArray,
  type CategoriesItem,
  type NewsWireArray,
  type PopularNewsArray,
  type HourlyWeatherData,
  type WeatherData,
} from './api';
import { type IHistoryLog, type PartialVotedNewsArray, RequestStatus, ThemeValue } from './db';

export interface AuthState {
  message: string;
  isLoggedIn: boolean;
  hasError: string | number | null;
  isCurrentUser: boolean;
  userTheme: ThemeValue;
  accessToken: string | null;
  refreshToken: string | null;
  thirdPartyRegister: boolean;
  user: {
    name: string;
    email: string;
    id: string;
  };
  haveAccounts: {
    google: boolean;
    facebook: boolean;
    apple: boolean;
  };
  status: RequestStatus;
}

export interface newsAPIState {
  popular: PopularNewsArray;
  searchByWord: ArticleNewsArray;
  categories: NewsWireArray;
  categoriesList: CategoriesItem[];
  searchByDate: ArticleNewsArray;
  isLoading: boolean;
  hasError: number | null;
  headline: string;
  hasResults: ResultsState;
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
  status: RequestStatus;
}
export interface WeatherState {
  isLoading: boolean;
  data: WeatherData;
  weatherByHour: HourlyWeatherData | [];
  hasError: number | null;
}

export interface FiltersState {
  filters: PartialVotedNewsArray;
  resultsState: ResultsState;
  isSorted: boolean;
}
