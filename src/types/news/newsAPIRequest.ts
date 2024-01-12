export type PopularRequest = '1' | '7' | '30';
export type KeywordRequest = string;
export type CategoryRequest = string;
export interface DateRequest {
  beginDate: string | null;
  endDate: string | null;
}
