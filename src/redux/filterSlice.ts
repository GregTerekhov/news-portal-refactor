import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from './store';
import type { FilterResults, PartialVotedNewsArray } from 'types';

export interface FiltersState {
  filters: PartialVotedNewsArray;
  resultsState: FilterResults;
  isSorted: boolean;
}

const initialState: FiltersState = {
  filters: [],
  resultsState: 'idle',
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
        state.resultsState = 'full';
      } else {
        state.resultsState = 'empty';
      }
    },
    changeSortState: (state, action: PayloadAction<boolean>) => {
      state.isSorted = action.payload;
    },
    resetFilters: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(results, (state, action) => {
      state.resultsState = action.payload;
    });
  },
});

export const selectIsSorted = (state: RootState) => state.filters.isSorted;
export const selectFilters = (state: RootState) => state.filters.filters;
export const selectResults = (state: RootState) => state.filters.resultsState;
export const { filterNews, resetFilters, changeSortState } = filterSlice.actions;
export const filtersReducer = filterSlice.reducer;
