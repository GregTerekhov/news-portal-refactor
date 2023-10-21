import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://news-webapp-express.onrender.com/api';

type NewsItem = {
  _id: number;
  title: string;
  description: string;
  isFavourite: boolean;
  hasRead: boolean;
  publishDate: string;
  edition: string;
  author: string;
  category: string;
  imgLink: string;
  newsUrl: string;
};

type NewsArray = Partial<NewsItem>[];

export const fetchAllNews = createAsyncThunk('newsDB/all', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/news');
    return response.data as NewsArray;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const addNews = createAsyncThunk(
  'newsDB/add',
  async (newsData: NewsArray, { rejectWithValue }) => {
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
    return response.data as NewsArray;
  } catch (e: any) {
    return rejectWithValue(e.response.data);
  }
});

export const fetchRead = createAsyncThunk('read/all', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/news/read');
    return response.data as NewsArray;
  } catch (e: any) {
    return rejectWithValue(e.response.data);
  }
});
