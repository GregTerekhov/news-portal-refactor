import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from './store';

import type { FilterResults, PartialVotedNewsArray } from 'types';

interface FiltersState {
  filters: PartialVotedNewsArray;
  hasResults: FilterResults;
  hasError: string | null;
}

const initialState: FiltersState = {
  filters: [],
  hasResults: 'idle',
  hasError: null,
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

export const selectFilters = (state: RootState) => state.filters.filters;
export const selectResults = (state: RootState) => state.filters.hasResults;
export const { filterNews, resetFilters } = filterSlice.actions;
export const filtersReducer = filterSlice.reducer;
