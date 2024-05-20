export interface Filters {
  keyword: string;
  title: string;
  author: string;
  publisher: string;
  materialType: string;
  selectedFilterDate: {
    startDate: string;
    endDate: string;
  };
}

export enum TriggerType {
  Keyword = 'keyword',
  Category = 'category',
  Period = 'period',
  Date = 'date',
  Filtering = 'filtering',
  Reset = 'reset',
}

export enum SortDirection {
  Ascending = 'asc',
  Descending = 'desc',
}

export interface SearchParamsObject {
  query: string;
  period: string;
  category: string;
}
