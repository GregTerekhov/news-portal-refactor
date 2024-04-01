import { useDBRedux, useNewsAPIRedux, useFiltersRedux } from 'reduxStore/hooks';
import {
  useFiltersStateContext,
  usePaginationContext,
  useReadSortStateContext,
  useSelectedDateContext,
} from 'contexts';

import type { PartialVotedNewsArray } from 'types';

import { useActiveLinks, useChooseRenderingNews, useReadNewsContent } from 'hooks';
import { applyCrossFilters, formatSortedDate } from 'helpers';

import { hasNonEmptyValue } from '../assistants';

const useFilterNews = () => {
  const {
    showResultsState,
    getFilteredNews,
    resetAllFiltersResults,
    filteredNews,
    isSorted,
    sortResults,
  } = useFiltersRedux();
  const { updateHeadline } = useNewsAPIRedux();
  const { allFavourites, allReads } = useDBRedux();

  const { filters, setSelectedMaterialType, resetFilters } = useFiltersStateContext();
  const { setSortedDates } = useReadSortStateContext();
  const { resetFiltersDay } = useSelectedDateContext();
  const { resetPagination } = usePaginationContext();

  const activeLinks = useActiveLinks();
  const sortedAccordionDates = useReadNewsContent();
  const { rebuildedNews } = useChooseRenderingNews(activeLinks);

  const { isHomeActive, isFavoriteActive, isReadActive } = activeLinks;

  //Перевірка, чи є значення фільтрів
  const hasFilterValue = hasNonEmptyValue(filters);

  //Функція фільтрації по періодам дат
  const handleFiltration = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();

    //Виведення alert, якщо є сортовані новини
    if (isSorted) {
      alert(`YOU CAN'T FILTERING AFTER SORTING. RESET THE SETTINGS AND TRY AGAIN`);
    }

    //Встановлення значення глобального стану завантаження новин
    showResultsState('loading');

    //Визначення заголовка, якщо локація - Домашня сторінка та скидання значення пагінації, якщо користувач знаходиться не на першій сторінці пагінації
    if (isHomeActive) {
      updateHeadline('Filtered News');
      resetPagination();
    }

    //Умова виходу з функції, якщо немає значень фільтрів
    if (!filters || !rebuildedNews || rebuildedNews?.length === 0) return;
    if (!hasFilterValue) return;

    //Крос-фільтрація по значенням фільтрів в залежності від локації
    let filteredNews: PartialVotedNewsArray = [];

    if (isHomeActive) {
      filteredNews = applyCrossFilters(rebuildedNews, filters);
    } else if (isFavoriteActive) {
      filteredNews = applyCrossFilters(allFavourites, filters);
    } else if (isReadActive) {
      filteredNews = applyCrossFilters(allReads, filters);
    }

    //Якщо є значення фільтрів зміна глобальних станів фільтрованих новин
    if (filteredNews && filteredNews.length > 0) {
      getFilteredNews(filteredNews);
      showResultsState('full');
    } else {
      showResultsState('empty');
    }
    sortResults(false);
  };

  //Функція сортування новин
  const handleSort = (order: string): void => {
    if (!rebuildedNews || rebuildedNews.length === 0) return;

    sortResults(true);

    //Створення нового масива об'єктів для сортованих новин в залежності від локації
    let sortedNews: PartialVotedNewsArray = [];

    if (isHomeActive) {
      sortedNews = [...rebuildedNews];
    } else if (isFavoriteActive) {
      sortedNews = [...allFavourites];
    } else if (isReadActive) {
      sortedNews = [...allReads];
    }

    //Сортування нового масива об'єктів новин
    sortedNews.sort((a, b) => {
      const dateA = formatSortedDate(a.publishDate);
      const dateB = formatSortedDate(b.publishDate);

      return order === 'asc' ? dateA - dateB : dateB - dateA;
    });

    //Зміна глобального стану фільтрованих новин
    getFilteredNews(sortedNews);
  };

  //Функція сортування акордеонів на сторінці Read
  const handleSortRead = async (order: string): Promise<void> => {
    if (!sortedAccordionDates) return;

    //Створення нового масива акордеонів та сортування в залежності від напрямку сортування
    const sortedDates =
      order === 'asc'
        ? Array.from(sortedAccordionDates).sort().reverse()
        : Array.from(sortedAccordionDates).sort();

    //Зміна глобального стану фільтрованих (сортованих) новин
    setSortedDates(sortedDates);
    sortResults(true);
  };

  //Скидання значень фільтрації
  const handleReset = async (): Promise<void> => {
    //Скидання заголовка новин, якщо є фільтровані новини на домашній сторінці
    if (isHomeActive) {
      if (filteredNews?.length > 0) {
        updateHeadline("Today's Hot News");
      }

      //Скидання значення пагінації, якщо користувач знаходився не на першій сторінці пагінації
      resetPagination();
    }

    //Скидання інших значень
    resetFilters();
    setSelectedMaterialType('');
    resetAllFiltersResults();
    resetFiltersDay();
    setSortedDates([]);
    sortResults(false);
  };

  return {
    isSorted,
    handleFiltration,
    handleSort,
    handleReset,
    handleSortRead,
  };
};

export default useFilterNews;
