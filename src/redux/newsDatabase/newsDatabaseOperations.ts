import {
  DeleteNewsResponse,
  HistoryLogResponse,
  PartialVotedNewsArray,
  SavedNewsResponse,
} from 'types';

import { axiosInstance, createAppAsyncThunk } from '../services';

export const fetchAllNews = createAppAsyncThunk<SavedNewsResponse>(
  'newsDB/all',
  async (_, { rejectWithValue }: any) => {
    try {
      const response = await axiosInstance.get<SavedNewsResponse>('/news');
      return response.data;
    } catch (error: any) {
      console.log('Error fetchAllNews', error.response.status);
      return rejectWithValue(error.response.status);
    }
  },
);

export const addNews = createAppAsyncThunk<SavedNewsResponse, PartialVotedNewsArray>(
  'newsDB/add',
  async (updatedData, { rejectWithValue }: any) => {
    console.log('updatedData', updatedData);
    try {
      const response = await axiosInstance.post<SavedNewsResponse>('/news', updatedData);
      console.log('responseADD', response.data);
      return response.data;
    } catch (error: any) {
      console.log(error.message);
      console.log('Error addNews', error.response.status);
      return rejectWithValue(error.response.status);
    }
  },
);

export const deleteNews = createAppAsyncThunk<DeleteNewsResponse, string>(
  'newsDB/delete',
  async (id, { rejectWithValue }: any) => {
    console.log('deletedId: ', id);
    try {
      const response = await axiosInstance.delete<DeleteNewsResponse>(`/news/archive/${id}`);
      console.log('responseDelete', response.data);
      return response.data;
    } catch (error: any) {
      console.log('Error deleteNews', error.response.status);
      return rejectWithValue(error.response.status);
    }
  },
);

export const fetchFavourites = createAppAsyncThunk<SavedNewsResponse>(
  'favourite/all',
  async (_, { rejectWithValue }: any) => {
    try {
      const response = await axiosInstance.get<SavedNewsResponse>('/news/favourite');
      console.log('allFavourites: ', response.data.data);
      return response.data;
    } catch (error: any) {
      console.log('Error fetchFavourites', error.response.status);
      return rejectWithValue(error.response.status);
    }
  },
);

export const fetchRead = createAppAsyncThunk<SavedNewsResponse>(
  'read/all',
  async (_, { rejectWithValue }: any) => {
    try {
      const response = await axiosInstance.get<SavedNewsResponse>('/news/read');
      return response.data;
    } catch (error: any) {
      console.log('Error fetchReads', error.response.status);
      return rejectWithValue(error.response.status);
    }
  },
);

export const fetchArchivedNews = createAppAsyncThunk<SavedNewsResponse>(
  'archive/all',
  async (_, { rejectWithValue }: any) => {
    try {
      const response = await axiosInstance.get<SavedNewsResponse>('/news/archive');
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.log('Error fetchArchives', error.response.status);
      return rejectWithValue(error.response.status);
    }
  },
);

export const fetchHistoryLog = createAppAsyncThunk<HistoryLogResponse>(
  'history/log',
  async (_, { rejectWithValue }: any) => {
    try {
      const response = await axiosInstance.get<HistoryLogResponse>('/news/history-log');
      console.log('HistoryLogResponse', response.data);
      return response.data;
    } catch (error: any) {
      console.log('Error fetchHistoryLog', error.response.status);
      return rejectWithValue(error.response.status);
    }
  },
);
