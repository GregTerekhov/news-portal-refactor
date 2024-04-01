import type { Filters } from 'types';

//Функція перевірки на існуюче значення фільтрів
export const hasNonEmptyValue = (filtersObject: Filters): boolean => {
  return Object.values(filtersObject).some((value) => {
    if (typeof value === 'object' && value !== null) {
      return hasNonEmptyValue(value);
    }
    return value !== '';
  });
};
