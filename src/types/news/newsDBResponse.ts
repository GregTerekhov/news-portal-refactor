type VotedPartial<T> = { [P in keyof T]?: T[P] };

export interface VotedItem {
  _id?: string;
  title: string;
  description?: string;
  isFavourite: boolean | undefined; // тимчасово для уникнення помилки типів в синхронній дії addOrUpdateVotedNews
  hasRead: boolean | undefined; // так само як описано вище
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

export type VotedNewsArray = VotedItem[];
export type PartialVotedNewsArray = VotedPartial<VotedItem>[];

export interface SavedNewsResponse {
  code: number;
  message: string;
  data: PartialVotedNewsArray;
}

export interface HistoryLogResponse {
  code: number;
  message: string;
  data: IHistoryLog[];
}

export interface DeleteNewsResponse {
  code: number;
  message: string;
  _id: string;
}
