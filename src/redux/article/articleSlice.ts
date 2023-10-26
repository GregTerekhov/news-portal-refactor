import { SerializedError, createSlice } from '@reduxjs/toolkit';
import { fetchArticle } from './articleOperations';

type ArticleState = {
  articleData: any;
  isLoading: boolean;
  hasError: SerializedError | null;
};

const initialState = {
  articleData: [],
  isLoading: false,
  hasError: null,
} as ArticleState;

const articleSlice: any = createSlice({
  name: 'article',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchArticle.fulfilled, (state, action) => {
        state.articleData = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchArticle.rejected, (state, action) => {
        state.hasError = action.error;
        state.isLoading = false;
      });
  },
});

export default articleSlice.reducer;
