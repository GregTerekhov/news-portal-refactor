import { PayloadAction, createAction, createSlice, isAnyOf } from '@reduxjs/toolkit';

import { ArticleNewsArray, NewsWireArray, PopularNewsArray, CategoriesItem } from 'types';

import * as newsAPIOperations from './newsAPIOperations';

type newsAPIState = {
  popular: PopularNewsArray;
  searchByWord: ArticleNewsArray;
  categories: NewsWireArray;
  categoriesList: CategoriesItem[];
  searchByDate: ArticleNewsArray;
  isLoading: boolean;
  hasError: {} | number | null;
  headline: string;
};

const initialState: newsAPIState = {
  popular: [],
  searchByWord: [],
  categories: [],
  categoriesList: [],
  searchByDate: [],
  isLoading: false,
  hasError: null,
  headline: 'Today`s Hot News',
};

const handlePending = (state: newsAPIState) => {
  state.isLoading = true;
  state.hasError = null;
};

const handleFulfilled = (state: newsAPIState) => {
  state.isLoading = false;
  state.hasError = null;
};

const handleRejected = (state: newsAPIState, action: PayloadAction<unknown, string, any>) => {
  state.isLoading = false;
  if (action.payload) {
    state.hasError = action.payload;
  }
  console.log('ERROR', action.payload, action);
};

const extraActions = [
  newsAPIOperations.fetchAllCategories,
  newsAPIOperations.fetchNewsByCategory,
  newsAPIOperations.fetchNewsByKeyword,
  newsAPIOperations.fetchPopularNews,
  newsAPIOperations.fetchNewsByDate,
];

const getActions = (type: 'pending' | 'fulfilled' | 'rejected') =>
  extraActions.map((action) => action[type]);

export const changeHeadline = createAction<string>('newsAPI/changeHeadline');

const newsAPISlice = createSlice({
  name: 'newsAPI',
  initialState,
  reducers: {
    resetOtherRequests: (state) => {
      if (state.popular.length > 0) {
        state.popular = initialState.popular;
      }
      if (state.categories.length > 0) {
        state.categories = initialState.categories;
      }
      if (state.searchByDate.length > 0) {
        state.searchByDate = initialState.searchByDate;
      }
      if (state.searchByWord.length > 0) {
        state.searchByWord = initialState.searchByWord;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(newsAPIOperations.fetchPopularNews.fulfilled, (state, action) => {
        state.popular = action.payload;
      })
      .addCase(newsAPIOperations.fetchNewsByKeyword.fulfilled, (state, action) => {
        state.searchByWord = action.payload;
        console.log('fetchNewsByKeyword', action.payload);
      })
      .addCase(newsAPIOperations.fetchAllCategories.fulfilled, (state, action) => {
        state.categoriesList = action.payload;
        console.log('fetchAllCategories', action.payload);
      })
      .addCase(newsAPIOperations.fetchNewsByCategory.fulfilled, (state, action) => {
        state.categories = action.payload;
        console.log('fetchNewsByCategory', action.payload);
      })
      .addCase(newsAPIOperations.fetchNewsByDate.fulfilled, (state, action) => {
        state.searchByDate = action.payload;
        console.log('fetchNewsByDate', action.payload);
      })
      .addCase(changeHeadline, (state, action) => {
        state.headline = action.payload;
      })
      .addMatcher(isAnyOf(...getActions('pending')), handlePending)
      .addMatcher(isAnyOf(...getActions('fulfilled')), handleFulfilled)
      .addMatcher(isAnyOf(...getActions('rejected')), handleRejected);
  },
});
export const { resetOtherRequests } = newsAPISlice.actions;
export const newsAPIReducer = newsAPISlice.reducer;
