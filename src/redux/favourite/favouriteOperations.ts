import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://api.nytimes.com/svc';
const API_KEY = 'uGHJWsajhmnJg2AMcnCD9YXkamMpVOHo';

export const fetchPopularNews: any = createAsyncThunk(`popular/fetch`, async (_, thunkAPI) => {
  try {
    const res: any = await axios.get(`${BASE_URL}/mostpopular/v2/viewed/1.json?`, {
      params: {
        'api-key': API_KEY,
      },
    });
    return res.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
    // if (axios.isAxiosError(error)) {
    // } else {
    //   return thunkAPI.rejectWithValue(error);
    // }
  }
});
