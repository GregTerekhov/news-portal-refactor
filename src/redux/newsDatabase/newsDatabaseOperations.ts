import {
  Routes,
  HTTPMethods,
  OperationName,
  type ServicesInfo,
  type DeleteNewsResponse,
  type HistoryLogResponse,
  type PartialVotedNewsArray,
  type SavedNewsResponse,
} from 'types';

import { requestWithInstanceTemplate } from '../services';

export const fetchAllNews = requestWithInstanceTemplate<void, SavedNewsResponse>(
  OperationName.GetSavedNews,
  Routes.GetAllAndAddNews,
  HTTPMethods.GET,
);

export const addNews = requestWithInstanceTemplate<PartialVotedNewsArray, SavedNewsResponse>(
  OperationName.AddNews,
  Routes.GetAllAndAddNews,
  HTTPMethods.POST,
);

export const deleteNews = requestWithInstanceTemplate<string, DeleteNewsResponse>(
  OperationName.DeleteNews,
  Routes.DeleteNews,
  HTTPMethods.DELETE,
);

export const fetchFavourites = requestWithInstanceTemplate<void, SavedNewsResponse>(
  OperationName.GetFavourite,
  Routes.SavedFavourite,
  HTTPMethods.GET,
);

export const fetchRead = requestWithInstanceTemplate<void, SavedNewsResponse>(
  OperationName.GetRead,
  Routes.SavedRead,
  HTTPMethods.GET,
);

export const fetchArchivedNews = requestWithInstanceTemplate<void, SavedNewsResponse>(
  OperationName.GetArchive,
  Routes.SavedArchive,
  HTTPMethods.GET,
);

export const fetchHistoryLog = requestWithInstanceTemplate<void, HistoryLogResponse>(
  OperationName.GetLog,
  Routes.SavedLog,
  HTTPMethods.GET,
);

export const clearHistoryLog = requestWithInstanceTemplate<void, ServicesInfo>(
  OperationName.ClearLog,
  Routes.ClearLog,
  HTTPMethods.DELETE,
);
