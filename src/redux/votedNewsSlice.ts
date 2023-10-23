import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { VotedItem, VotedNewsArray } from 'types';

const initialState: VotedNewsArray = [];

const votedNewsSlice = createSlice({
  name: 'votedNews',
  initialState,
  reducers: {
    addOrUpdateVotedNews: (state, action: PayloadAction<VotedItem>) => {
      const updatedVotedNews = action.payload;
      const existingNewsIndex = state.findIndex((news) => news.id === updatedVotedNews.id);

      if (existingNewsIndex !== -1) {
        if (updatedVotedNews.isFavourite || updatedVotedNews.hasRead) {
          state[existingNewsIndex] = {
            ...state[existingNewsIndex],
            isFavourite: updatedVotedNews.isFavourite,
            hasRead: updatedVotedNews.hasRead,
          };
        } else if (!updatedVotedNews.isFavourite && !updatedVotedNews.hasRead) {
          state.splice(existingNewsIndex, 1);
        }
      } else {
        state.push(updatedVotedNews);
      }
    },
    clearVotedNews: (state) => {
      state = [];
    },
  },
});

export const { addOrUpdateVotedNews, clearVotedNews } = votedNewsSlice.actions;
export default votedNewsSlice.reducer;
