import { useEffect, useState } from 'react';

import type { PartialVotedNewsArray } from 'types';
import { useNewsAPIRedux, useFiltersRedux } from 'reduxStore/hooks';
import { usePaginationContext, useWindowWidthContext } from 'contexts';

import { calculateFirstIndexes, FIRST_PAGE, cardsPerPage } from '../assistants';

const usePagination = (rebuiltNews: PartialVotedNewsArray) => {
  const [currentItems, setCurrentItems] = useState<PartialVotedNewsArray>([]);

  const { popularNews, newsByKeyword, newsByCategory, newsByDate } = useNewsAPIRedux();
  const { filteredNews } = useFiltersRedux();
  const { isSmallScreens, isTablet } = useWindowWidthContext();
  const { currentPage } = usePaginationContext();

  const totalPages: number = (rebuiltNews && rebuiltNews?.length) || 0;

  // Розрахунок масива кількості сторінок для кожного типу пристрою
  const currentArrayPerPage: number[] = cardsPerPage(totalPages, isSmallScreens, isTablet);

  // Визначення кількості об'єктів новин на сторінці в залежності від типу пристрою
  const currentCardsPerPage: number = currentArrayPerPage[currentPage - FIRST_PAGE] || 0;

  //Вирахування першого індекса новини для останньої сторінки
  const calculatedFirstIndexes: number = calculateFirstIndexes(currentArrayPerPage, totalPages);

  useEffect(() => {
    if (rebuiltNews && rebuiltNews?.length > 0) {
      //перевірка, якщо результат множення поточної сторінки на необхідну кількість об'єктів на сторінці - 1 більше, або дорівнює загальної довжині масива об'єктів новин. Необхідна, щоб індекс останнього елемента не був більше довжини масива
      const calculationOfLastElements: boolean =
        currentPage * currentCardsPerPage - FIRST_PAGE >= totalPages;
      const lastPage =
        currentPage > FIRST_PAGE && calculationOfLastElements && !!calculatedFirstIndexes;

      let indexOfLastItem: number;
      let indexOfFirstItem: number;

      if (currentPage === FIRST_PAGE) {
        indexOfLastItem = currentPage * currentCardsPerPage;
        indexOfFirstItem = indexOfLastItem - currentCardsPerPage;
      } else if (lastPage) {
        //Якщо перевірка вище спрацювала і є значення першого індекса для останній сторінки. Розрахунок для останній сторінки
        indexOfLastItem = currentPage * currentCardsPerPage;
        indexOfFirstItem = indexOfLastItem - currentCardsPerPage - FIRST_PAGE;
      } else {
        //Для всіх окрім першій та останній
        indexOfLastItem = currentPage * currentCardsPerPage - FIRST_PAGE;
        indexOfFirstItem = indexOfLastItem - currentCardsPerPage;
      }

      const items = rebuiltNews.slice(indexOfFirstItem, indexOfLastItem);
      setCurrentItems(items);
    }
  }, [popularNews, newsByKeyword, newsByCategory, newsByDate, filteredNews, currentPage]);

  // Розрахунок необхідної кількості кнопок пагінації
  const pageQuantity: number =
    currentPage !== FIRST_PAGE && isSmallScreens
      ? Math.ceil(totalPages / currentCardsPerPage + FIRST_PAGE)
      : Math.ceil(totalPages / currentCardsPerPage);

  const pageNumbers: number[] = Array.from(
    { length: pageQuantity },
    (_, index) => index + FIRST_PAGE,
  );

  return {
    currentItems,
    pageNumbers,
  };
};

export default usePagination;
