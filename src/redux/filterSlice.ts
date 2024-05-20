import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';

import type { RootState } from './store';
import { ResultsState, OperationName, PartialVotedNewsArray, SliceName } from 'types';

export interface FiltersState {
  filters: PartialVotedNewsArray;
  resultsState: ResultsState;
  isSorted: boolean;
}

const initialState: FiltersState = {
  filters: [],
  resultsState: ResultsState.Idle,
  isSorted: false,
};

export const results = createAction<ResultsState>(OperationName.Filters);

const filterSlice = createSlice({
  name: SliceName.Filter,
  initialState,
  reducers: {
    filterNews: (state, action: PayloadAction<PartialVotedNewsArray>) => {
      state.filters.length = 0;
      if (action.payload.length === 0) state.resultsState = ResultsState.Empty;

      state.filters.push(...action.payload);
      state.resultsState = ResultsState.Fulfilled;
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
