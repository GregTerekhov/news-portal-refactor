export enum TimePeriodRequest {
  Today = 1,
  Week = 7,
  Month = 30,
}

export type TimePeriodDate = keyof typeof TimePeriodRequest; // FIXME

export interface PopularRequest {
  period: TimePeriodRequest;
}
export type KeywordRequest = { query: string };
export type CategoryRequest = string;
export interface DateRequest {
  beginDate: string;
  endDate: string;
}
