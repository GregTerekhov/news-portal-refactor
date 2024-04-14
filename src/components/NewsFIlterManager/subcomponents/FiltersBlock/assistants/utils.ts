import type { Filters, PartialVotedNewsArray } from 'types';

import { applyCrossFilters } from 'helpers';
import type { ActiveLinks } from 'hooks/commonTypes';

//Функція перевірки на існуюче значення фільтрів
export const hasNonEmptyValue = (filtersObject: Filters): boolean => {
  return Object.values(filtersObject).some((value) => {
    if (typeof value === 'object' && value !== null) {
      return hasNonEmptyValue(value);
    }
    return value !== '';
  });
};

export const getCrossFilteredNews = (
  rebuiltNews: PartialVotedNewsArray,
  filters: Filters,
  activeLinks: ActiveLinks,
  allFavourites: PartialVotedNewsArray,
  allReads: PartialVotedNewsArray,
): PartialVotedNewsArray => {
  //Крос-фільтрація по значенням фільтрів в залежності від локації
  let filteredNews: PartialVotedNewsArray = [];

  const { isHomeActive, isFavoriteActive, isReadActive } = activeLinks;

  switch (true) {
    case isHomeActive:
      filteredNews = applyCrossFilters(rebuiltNews, filters);
      break;
    case isFavoriteActive:
      filteredNews = applyCrossFilters(allFavourites, filters);
      break;
    case isReadActive:
      filteredNews = applyCrossFilters(allReads, filters);
      break;

    default:
      break;
  }

  return filteredNews;
};
