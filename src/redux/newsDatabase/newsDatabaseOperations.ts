import { createAsyncThunk } from '@reduxjs/toolkit';

import { IHistoryLog, PartialVotedNewsArray } from 'types';
import { axiosInstance } from 'reduxStore/auth';

export const fetchAllNews = createAsyncThunk('newsDB/all', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/news');
    // console.log('responseAll', response.data.data);
    return response.data.data as PartialVotedNewsArray;
  } catch (error: any) {
    console.log('Error fetchAllNews', error.message);
    return rejectWithValue(error.message);
  }
});

export const addNews = createAsyncThunk(
  'newsDB/add',
  async (updatedData: PartialVotedNewsArray, { rejectWithValue }) => {
    console.log('updatedData', updatedData);
    try {
      const response = await axiosInstance.post('/news', updatedData);
      console.log('responseADD', response.data);
      return response.data.data;
    } catch (error: any) {
      console.log(error.message);
      console.log('Error addNews', error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const deleteNews = createAsyncThunk(
  'newsDB/delete',
  async (id: string, { rejectWithValue }) => {
    console.log('deletedId: ', id);
    try {
      const response = await axiosInstance.delete(`/news/${id}`);
      console.log('responseDelete', response.data);
      return response.data;
    } catch (error: any) {
      console.log('Error deleteNews', error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const fetchFavourites = createAsyncThunk('favourite/all', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/news/favourite');
    console.log('allFavourites: ', response.data.data);
    return response.data.data as PartialVotedNewsArray;
  } catch (error: any) {
    console.log('Error fetchFavourites', error.message);
    return rejectWithValue(error.message);
  }
});

export const fetchRead = createAsyncThunk('read/all', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/news/read');
    return response.data.data as PartialVotedNewsArray;
  } catch (error: any) {
    console.log('Error fetchReads', error.message);
    return rejectWithValue(error.message);
  }
});

export const fetchArchivedNews = createAsyncThunk('archive/all', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/news/archive');
    return response.data.data as PartialVotedNewsArray;
  } catch (error: any) {
    console.log('Error fetchArchives', error.message);
    return rejectWithValue(error.message);
  }
});

export const fetchHistoryLog = createAsyncThunk('history/log', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/news/history-log');
    return response.data.data as IHistoryLog[];
  } catch (error: any) {
    console.log('Error fetchHistoryLog', error.message);
    return rejectWithValue(error.message);
  }
});
