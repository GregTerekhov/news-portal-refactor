import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  DeleteNewsResponse,
  HistoryLogResponse,
  PartialVotedNewsArray,
  SavedNewsResponse,
} from 'types';
import { axiosInstance } from 'reduxStore/auth';

export const fetchAllNews = createAsyncThunk<SavedNewsResponse>(
  'newsDB/all',
  async (_, { rejectWithValue }: any) => {
    try {
      const response = await axiosInstance.get<SavedNewsResponse>('/news');
      // console.log('responseAll', response.data.data);
      return response.data;
    } catch (error: any) {
      console.log('Error fetchAllNews', error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const addNews = createAsyncThunk<SavedNewsResponse, PartialVotedNewsArray>(
  'newsDB/add',
  async (updatedData, { rejectWithValue }: any) => {
    console.log('updatedData', updatedData);
    try {
      const response = await axiosInstance.post<SavedNewsResponse>('/news', updatedData);
      console.log('responseADD', response.data);
      return response.data;
    } catch (error: any) {
      console.log(error.message);
      console.log('Error addNews', error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const deleteNews = createAsyncThunk<DeleteNewsResponse, string>(
  'newsDB/delete',
  async (id, { rejectWithValue }: any) => {
    console.log('deletedId: ', id);
    try {
      const response = await axiosInstance.delete<DeleteNewsResponse>(`/news/archive/${id}`);
      console.log('responseDelete', response.data);
      return response.data;
    } catch (error: any) {
      console.log('Error deleteNews', error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const fetchFavourites = createAsyncThunk<SavedNewsResponse>(
  'favourite/all',
  async (_, { rejectWithValue }: any) => {
    try {
      const response = await axiosInstance.get<SavedNewsResponse>('/news/favourite');
      console.log('allFavourites: ', response.data.data);
      return response.data;
    } catch (error: any) {
      console.log('Error fetchFavourites', error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const fetchRead = createAsyncThunk<SavedNewsResponse>(
  'read/all',
  async (_, { rejectWithValue }: any) => {
    try {
      const response = await axiosInstance.get<SavedNewsResponse>('/news/read');
      return response.data;
    } catch (error: any) {
      console.log('Error fetchReads', error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const fetchArchivedNews = createAsyncThunk<SavedNewsResponse>(
  'archive/all',
  async (_, { rejectWithValue }: any) => {
    try {
      const response = await axiosInstance.get<SavedNewsResponse>('/news/archive');
      return response.data;
    } catch (error: any) {
      console.log('Error fetchArchives', error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const fetchHistoryLog = createAsyncThunk<HistoryLogResponse>(
  'history/log',
  async (_, { rejectWithValue }: any) => {
    try {
      const response = await axiosInstance.get<HistoryLogResponse>('/news/history-log');
      console.log('HistoryLogResponse', response.data);
      return response.data;
    } catch (error: any) {
      console.log('Error fetchHistoryLog', error.message);
      return rejectWithValue(error.message);
    }
  },
);
