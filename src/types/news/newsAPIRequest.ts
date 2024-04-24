type PopularRequestValues = 1 | 7 | 30;

export interface PopularRequest {
  period: PopularRequestValues;
}
export type KeywordRequest = { query: string };
export type CategoryRequest = string;
export interface DateRequest {
  beginDate: string;
  endDate: string;
}

export type SearchParamsObject = {
  query: string;
  period: string;
  category: string;
};
