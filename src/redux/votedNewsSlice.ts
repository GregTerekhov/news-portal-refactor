import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { VotedItem, PartialVotedNewsArray } from 'types';
import { RootState } from './store';

const initialState: PartialVotedNewsArray = [];

const votedNewsSlice = createSlice({
  name: 'votedNews',
  initialState,
  reducers: {
    addOrUpdateVotedNews: (state, action: PayloadAction<VotedItem>) => {
      const updatedVotedNews = action.payload;
      console.log(action.payload);
      const existingNewsIndex = state.findIndex(
        (news) => news.newsUrl === updatedVotedNews.newsUrl,
      );

      if (existingNewsIndex !== -1) {
        if (updatedVotedNews.isFavourite || updatedVotedNews.hasRead) {
          state[existingNewsIndex] = {
            ...state[existingNewsIndex],
            isFavourite: updatedVotedNews.isFavourite,
            hasRead: updatedVotedNews.hasRead,
          };
          console.log(state);
        } else if (!updatedVotedNews.isFavourite && !updatedVotedNews.hasRead) {
          state.splice(existingNewsIndex, 1);
        }
      } else {
        state.push(updatedVotedNews);
      }
    },
    clearVotedNews: () => {
      return initialState;
    },
  },
});

export const selectVotedNews = (state: RootState) => state.votedNews;
export const { addOrUpdateVotedNews, clearVotedNews } = votedNewsSlice.actions;
export default votedNewsSlice.reducer;
