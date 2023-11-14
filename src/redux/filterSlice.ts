import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PartialVotedNewsArray } from 'types/news';
import { RootState } from './store';

const initialState = [] as PartialVotedNewsArray;

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    filterNews: (state, action: PayloadAction<PartialVotedNewsArray>) => {
      state.length = 0;
      state.push(...action.payload);
    },
    resetFilters: () => {
      return initialState;
    },
  },
});

export const selectFilters = (state: RootState) => state.filters;
export const { filterNews, resetFilters } = filterSlice.actions;
export const filtersSliceReducer = filterSlice.reducer;
