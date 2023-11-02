import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PartialVotedNewsArray } from 'types';

axios.defaults.baseURL = 'https://news-webapp-express.onrender.com/api';

export const fetchAllNews = createAsyncThunk('newsDB/all', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/news');
    console.log('responseAll', response.data.data);
    return response.data.data as PartialVotedNewsArray;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const addNews = createAsyncThunk(
  'newsDB/add',
  async (updatedData: PartialVotedNewsArray, { rejectWithValue }) => {
    console.log('updatedData', updatedData);
    try {
      const response = await axios.post('/news', updatedData);
      console.log('responseADD', response.data);
      return response.data.data;
    } catch (error: any) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchFavourites = createAsyncThunk('favourite/all', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/news/favourite');
    return response.data.data as PartialVotedNewsArray;
  } catch (error: any) {
    console.log(error.response.data);
    return rejectWithValue(error.response.data);
  }
});

export const fetchRead = createAsyncThunk('read/all', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/news/read');
    return response.data.data as PartialVotedNewsArray;
  } catch (error: any) {
    console.log(error.response.data);
    return rejectWithValue(error.response.data);
  }
});
