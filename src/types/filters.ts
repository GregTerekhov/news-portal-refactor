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
