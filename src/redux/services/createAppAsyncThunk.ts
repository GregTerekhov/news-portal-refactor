import { createAsyncThunk } from '@reduxjs/toolkit';

import { AppDispatch, RootState } from '../store';

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string | number;
  extra: { s: string; n: number };
}>();

export default createAppAsyncThunk;
