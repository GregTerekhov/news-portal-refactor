import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from './store';

import type { FilterResults, PartialVotedNewsArray } from 'types';

export interface FiltersState {
  filters: PartialVotedNewsArray;
  hasResults: FilterResults;
  hasError: string | null;
  isSorted: boolean;
}

const initialState: FiltersState = {
  filters: [],
  hasResults: 'idle',
  hasError: null,
  isSorted: false,
};

export const results = createAction<FilterResults>('filters/filtering');

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    filterNews: (state, action: PayloadAction<PartialVotedNewsArray>) => {
      state.filters.length = 0;
      state.filters.push(...action.payload);
      if (action.payload.length > 0) {
        state.hasResults = 'full';
        state.hasError = null;
      } else {
        state.hasResults = 'empty';
      }
    },
    sortNews: (state, action: PayloadAction<boolean>) => {
      state.isSorted = action.payload;
    },
    resetFilters: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(results, (state, action) => {
      state.hasResults = action.payload;
    });
  },
});

export const selectIsSorted = (state: RootState) => state.filters.isSorted;
export const selectFilters = (state: RootState) => state.filters.filters;
export const selectResults = (state: RootState) => state.filters.hasResults;
export const { filterNews, resetFilters, sortNews } = filterSlice.actions;
export const filtersReducer = filterSlice.reducer;
