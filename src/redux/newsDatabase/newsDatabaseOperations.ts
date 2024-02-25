import {
  DeleteNewsResponse,
  HistoryLogResponse,
  PartialVotedNewsArray,
  SavedNewsResponse,
} from 'types';

import { requestWithInstanceTemplate, createAppAsyncThunk, axiosInstance } from '../services';

export const fetchAllNews = requestWithInstanceTemplate<void, SavedNewsResponse>(
  'newsDB/all',
  '/news',
  'get',
);

export const addNews = requestWithInstanceTemplate<PartialVotedNewsArray, SavedNewsResponse>(
  'newsDB/add',
  '/news',
  'post',
);

// export const deleteNews = requestWithInstanceTemplate<string, DeleteNewsResponse>(
//   'newsDB/delete',
//   '/news/archive',
//   'get',
//   true,
//   // { pathParams: 'id' },
// );

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

export const fetchFavourites = requestWithInstanceTemplate<void, SavedNewsResponse>(
  'favourite/all',
  '/news/favourite',
  'get',
);

export const fetchRead = requestWithInstanceTemplate<void, SavedNewsResponse>(
  'read/all',
  '/news/read',
  'get',
);

export const fetchArchivedNews = requestWithInstanceTemplate<void, SavedNewsResponse>(
  'archive/all',
  '/news/archive',
  'get',
);

export const fetchHistoryLog = requestWithInstanceTemplate<void, HistoryLogResponse>(
  'history/log',
  '/news/history-log',
  'get',
);
