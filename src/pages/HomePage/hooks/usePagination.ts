import { useEffect, useState } from 'react';

import { useNewsAPIRedux, useFiltersRedux } from 'reduxStore/hooks';
import { usePaginationContext, useWindowWidthContext } from 'contexts';

import type { PartialVotedNewsArray } from 'types';

import { calculatePagesForDevices, calculateFirstIndexes, COUNT } from '../assistants';

const usePagination = (rebuildedNews: PartialVotedNewsArray) => {
  const { popularNews, newsByKeyword, newsByCategory, newsByDate } = useNewsAPIRedux();
  const { filteredNews } = useFiltersRedux();
  const { isMobile, isTablet } = useWindowWidthContext();
  const { currentPage } = usePaginationContext();

  const [currentItems, setCurrentItems] = useState<PartialVotedNewsArray>([]);

  const totalPages: number = (rebuildedNews && rebuildedNews?.length) || 0;

  const itemsPerFirstPage: number = getFirstPageCount();
  const itemsPerOtherPages: number = getOtherPageCount();

  // Розрахунок масива кількості сторінок для кожного типу пристрою
  const currentArrayPerPage: number[] = calculatePagesForDevices(
    totalPages,
    itemsPerFirstPage,
    itemsPerOtherPages,
  );

  // Визначення кількості об'єктів новин на сторінці в залежності від типу пристрою
  const currentCardsPerPage: number = currentArrayPerPage[currentPage - 1] || 0;
  //Вирахування першого індекса новини для останньої сторінки
  const calculatedFirstIndexes: number | void = calculateFirstIndexes(
    currentArrayPerPage,
    totalPages,
  );

  useEffect(() => {
    if (rebuildedNews && rebuildedNews?.length > 0) {
      //перевірка, якщо результат множення поточної сторінки на необхідну кількість об'єктів на сторінці - 1 більше, або дорівнює загальної довжині масива об'єктів новин. Необхідна, щоб індекс останнього елемента не був більше довжини масива
      const calculationOfLastElements: boolean =
        currentPage * currentCardsPerPage - 1 >= totalPages;
      let indexOfLastItem: number;
      let indexOfFirstItem: number;

      if (currentPage === 1) {
        indexOfLastItem = currentPage * currentCardsPerPage;
        indexOfFirstItem = indexOfLastItem - currentCardsPerPage;
      } else if (currentPage > 1 && calculationOfLastElements && calculatedFirstIndexes) {
        //Якщо перевірка вище спрацювала і є значення першого індекса для останній сторінці. Розрахунок для останній сторінки
        indexOfLastItem = totalPages;
        indexOfFirstItem = totalPages - calculatedFirstIndexes;
      } else {
        //Для всіх окрім першій та останній
        indexOfLastItem = currentPage * currentCardsPerPage - 1;
        indexOfFirstItem = indexOfLastItem - currentCardsPerPage;
      }

      const items = rebuildedNews.slice(indexOfFirstItem, indexOfLastItem);
      setCurrentItems(items);
    }
  }, [popularNews, newsByKeyword, newsByCategory, newsByDate, filteredNews, currentPage]);

  //Отримання кількості новин на першій сторінці для кожного пристроя
  function getFirstPageCount(): number {
    if (isMobile) {
      return COUNT.FIRST_MOBILE_PAGE_COUNT;
    } else if (isTablet) {
      return COUNT.FIRST_TABLET_PAGE_COUNT;
    } else {
      return COUNT.FIRST_DESKTOP_PAGE_COUNT;
    }
  }

  //Отримання кількості новин на інших сторінках для кожного пристроя
  function getOtherPageCount(): number {
    if (isMobile) {
      return COUNT.OTHER_MOBILE_PAGE_COUNT;
    } else if (isTablet) {
      return COUNT.OTHER_TABLET_PAGE_COUNT;
    } else {
      return COUNT.OTHER_DESKTOP_PAGE_COUNT;
    }
  }

  // Розрахунок необхідної кількості кнопок пагінації
  const pageQuantity: number =
    currentPage !== 1 && isMobile
      ? Math.ceil(totalPages / currentCardsPerPage + 1)
      : Math.ceil(totalPages / currentCardsPerPage);

  const pageNumbers: number[] = Array.from({ length: pageQuantity }, (_, index) => index + 1);

  return {
    currentItems,
    pageNumbers,
  };
};

export default usePagination;
