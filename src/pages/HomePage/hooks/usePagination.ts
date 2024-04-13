import { useEffect, useState } from 'react';

import { useNewsAPIRedux, useFiltersRedux } from 'reduxStore/hooks';
import { usePaginationContext, useWindowWidthContext } from 'contexts';

import type { PartialVotedNewsArray } from 'types';

import { calculateFirstIndexes, FIRST_PAGE, cardsPerPage } from '../assistants';

const usePagination = (rebuiltNews: PartialVotedNewsArray) => {
  const [currentItems, setCurrentItems] = useState<PartialVotedNewsArray>([]);

  const { popularNews, newsByKeyword, newsByCategory, newsByDate } = useNewsAPIRedux();
  const { filteredNews } = useFiltersRedux();
  const { isMobile, isTablet, wideScreens } = useWindowWidthContext();
  const { currentPage } = usePaginationContext();

  const totalPages: number = (rebuiltNews && rebuiltNews?.length) || 0;

  // Розрахунок масива кількості сторінок для кожного типу пристрою
  const cardsArrayPerPage: number[] = cardsPerPage(totalPages, wideScreens, isTablet);

  // Визначення кількості об'єктів новин на сторінці в залежності від типу пристрою
  const currentCardsPerPage: number = cardsArrayPerPage[currentPage - 1] || 0;

  //Вирахування першого індекса новини для останньої сторінки
  const calculatedFirstIndexes: number | void = calculateFirstIndexes(
    cardsArrayPerPage,
    totalPages,
  );

  useEffect(() => {
    if (rebuiltNews && rebuiltNews?.length > 0) {
      //перевірка, якщо результат множення поточної сторінки на необхідну кількість об'єктів на сторінці - 1 більше, або дорівнює загальної довжині масива об'єктів новин. Необхідна, щоб індекс останнього елемента не був більше довжини масива
      const calculationOfLastElements: boolean =
        currentPage * currentCardsPerPage - FIRST_PAGE >= totalPages;
      const lastPage =
        currentPage > FIRST_PAGE && calculationOfLastElements && !!calculatedFirstIndexes;

      let indexOfLastItem: number;
      let indexOfFirstItem: number;

      switch (true) {
        case currentPage === FIRST_PAGE:
          indexOfLastItem = currentPage * currentCardsPerPage;
          indexOfFirstItem = indexOfLastItem - currentCardsPerPage;
          break;
        //Якщо перевірка вище спрацювала і є значення першого індекса для останній сторінці. Розрахунок для останній сторінки
        case lastPage:
          indexOfLastItem = currentPage * currentCardsPerPage;
          indexOfFirstItem = indexOfLastItem - currentCardsPerPage;
          break;

        //Для всіх окрім першій та останній
        default:
          indexOfLastItem = currentPage * currentCardsPerPage - FIRST_PAGE;
          indexOfFirstItem = indexOfLastItem - currentCardsPerPage;
          break;
      }

      const items = rebuiltNews.slice(indexOfFirstItem, indexOfLastItem);
      setCurrentItems(items);
    }
  }, [popularNews, newsByKeyword, newsByCategory, newsByDate, filteredNews, currentPage]);

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
