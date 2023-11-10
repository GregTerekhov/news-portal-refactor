import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PartialVotedNewsArray } from 'types/news';
import { RootState } from './store';

const filterSlice = createSlice({
  name: 'filters',
  initialState: [] as PartialVotedNewsArray,
  reducers: {
    filterNews: (state, action: PayloadAction<PartialVotedNewsArray>) => {
      // console.log(action.payload);
      state.length = 0;
      state.push(...action.payload);
    },
  },
});

export const selectFilters = (state: RootState) => state.filters;
export const { filterNews } = filterSlice.actions;
export default filterSlice.reducer;
