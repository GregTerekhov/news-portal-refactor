import type {
  ClearLogResponse,
  DeleteNewsResponse,
  HistoryLogResponse,
  PartialVotedNewsArray,
  SavedNewsResponse,
} from 'types';

import { requestWithInstanceTemplate } from '../services';

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

export const deleteNews = requestWithInstanceTemplate<string, DeleteNewsResponse>(
  'newsDB/delete',
  '/news/archive/_id',
  'delete',
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
  'historyLog/all',
  '/news/history-log',
  'get',
);

export const clearHistoryLog = requestWithInstanceTemplate<void, ClearLogResponse>(
  'historyLog/clear',
  '/news/delete-log',
  'delete',
);
