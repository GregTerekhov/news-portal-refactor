import type { ActiveLinks, Filters, PartialVotedNewsArray, VotedItem, VotedPartial } from 'types';
import { isDateWithinRange } from 'helpers';

//Функція перевірки на існуюче значення фільтрів
export const hasNonEmptyValue = (filtersObject: Filters): boolean => {
  return Object.values(filtersObject).some((value) => {
    if (typeof value === 'object' && value !== null) {
      return hasNonEmptyValue(value);
    }
    return value !== '';
  });
};

//Function to create a filter callback
function createRegexFilter(regex: RegExp | null, fields: (keyof VotedItem)[]) {
  return (news: VotedPartial<VotedItem>): boolean =>
    regex ? fields.some((field) => news[field]?.toString().match(regex)) : false;
}

//Function to create a date filter callback
function createDateFilter(startDate: string, endDate: string) {
  return (news: VotedPartial<VotedItem>): boolean =>
    startDate !== '' && endDate !== '' && !!news?.publishDate
      ? isDateWithinRange(news.publishDate, startDate, endDate)
      : false;
}

// Function to news' cross-filtering
function applyCrossFilters(
  newsArray: PartialVotedNewsArray | undefined,
  filters: Filters,
): PartialVotedNewsArray {
  if (!newsArray || newsArray.length === 0 || !filters) {
    return [];
  }

  const { keyword, title, author, publisher, materialType, selectedFilterDate } = filters;

  const regexFilters = {
    keyword: createRegexFilter(keyword ? new RegExp(keyword, 'i') : null, ['title', 'description']),
    title: createRegexFilter(title ? new RegExp(title, 'i') : null, ['title']),
    author: createRegexFilter(author ? new RegExp(author, 'i') : null, ['author']),
    publisher: createRegexFilter(publisher ? new RegExp(publisher, 'i') : null, ['edition']),
    materialType: createRegexFilter(materialType ? new RegExp(materialType, 'i') : null, [
      'materialType',
    ]),
  };

  const dateFilter = createDateFilter(selectedFilterDate.startDate, selectedFilterDate.endDate);

  return newsArray.filter(
    (news) =>
      regexFilters.keyword(news) ||
      regexFilters.title(news) ||
      regexFilters.author(news) ||
      regexFilters.publisher(news) ||
      regexFilters.materialType(news) ||
      dateFilter(news),
  );
}

export const getCrossFilteredNews = (
  rebuiltNews: PartialVotedNewsArray,
  filters: Filters,
  activeLinks: ActiveLinks,
  allFavourites: PartialVotedNewsArray,
  allReads: PartialVotedNewsArray,
): PartialVotedNewsArray => {
  //Крос-фільтрація по значенням фільтрів в залежності від локації
  const { isHomeActive, isFavoriteActive, isReadActive } = activeLinks;

  switch (true) {
    case isHomeActive:
      return applyCrossFilters(rebuiltNews, filters);
    case isFavoriteActive:
      return applyCrossFilters(allFavourites, filters);
    case isReadActive:
      return applyCrossFilters(allReads, filters);

    default:
      return [];
  }
};
