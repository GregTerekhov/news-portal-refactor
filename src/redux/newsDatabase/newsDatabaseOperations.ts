import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PartialVotedNewsArray } from 'types';

axios.defaults.baseURL = 'https://news-webapp-express.onrender.com/api';

export const fetchAllNews = createAsyncThunk('newsDB/all', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/news');
    return response.data as PartialVotedNewsArray;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const addNews = createAsyncThunk(
  'newsDB/add',
  async (newsData: PartialVotedNewsArray, { rejectWithValue }) => {
    try {
      const response = await axios.post('/news', newsData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchFavourites = createAsyncThunk('favourite/all', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/news/favourite');
    console.log(response.data);
    return response.data as PartialVotedNewsArray;
  } catch (e: any) {
    return rejectWithValue(e.response.data);
  }
});

export const fetchRead = createAsyncThunk('read/all', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/news/read');
    return response.data as PartialVotedNewsArray;
  } catch (e: any) {
    return rejectWithValue(e.response.data);
  }
});
