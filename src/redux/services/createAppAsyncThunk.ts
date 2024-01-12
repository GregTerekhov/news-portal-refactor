import { createAsyncThunk } from '@reduxjs/toolkit';

import { AppDispatch, RootState } from 'reduxStore/store';

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
  extra: { s: string; n: number };
}>();

export default createAppAsyncThunk;
