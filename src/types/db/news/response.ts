import { ServicesInfo } from '../common';

export type VotedPartial<T> = { [P in keyof T]?: T[P] };

export interface VotedItem {
  _id?: string;
  title: string;
  description?: string;
  isFavourite: boolean | undefined;
  hasRead: boolean | undefined;
  publishDate: string;
  edition?: string;
  author?: string | undefined;
  category: string;
  imgLink?: string;
  imgAlt?: string;
  newsUrl: string;
  materialType?: string;
  additionDate?: number | null | undefined;
}

export interface IHistoryLog {
  title: string;
  category: string;
  newsUrl: string;
  additionDate: number;
  deletionDate: number;
}

export type PartialVotedNewsArray = VotedPartial<VotedItem>[];

export type SavedNewsResponse = ServicesInfo & {
  data: PartialVotedNewsArray;
};

export type HistoryLogResponse = ServicesInfo & {
  data: IHistoryLog[];
};

export type DeleteNewsResponse = ServicesInfo & {
  _id: string;
};
