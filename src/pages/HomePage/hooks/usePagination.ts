import { useEffect, useState } from 'react';

import { PartialVotedNewsArray } from 'types';
import { useWindowWidth, useNewsAPICollector, useFilterCollector } from 'hooks';

const usePagination = (rebuildedNews: PartialVotedNewsArray) => {
  const { breakpointsForMarkup } = useWindowWidth() || {
    breakpointsForMarkup: null,
  };
  const { popularNews, newsByKeyword, newsByCategory, newsByDate } = useNewsAPICollector();
  const { filteredNews } = useFilterCollector();

  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState<PartialVotedNewsArray>([]);

  const totalPages = (rebuildedNews && rebuildedNews?.length) || 0;

  const firstMobileItemsPerPage = 4; // Кількість новин для мобільного пристрою на першій сторінці
  const firstTabletItemsPerPage = 7; // Кількість новин для мобільного пристрою на першій сторінці
  const firstDesktopItemsPerPage = 8; // Кількість новин для мобільного пристрою на першій сторінці
  const otherMobileCardsPerPage = 5; // Кількість новин для мобільного пристрою на послідуючих сторінках
  const otherTabletCardsPerPage = 8; // Кількість новин для таблетки на послідуючих сторінках
  const otherDesktopCardsPerPage = 9; // Кількість новин для десктопу на послідуючих сторінках

  // Розрахунок кількості сторінок для кожного типу пристрою
  const mobilePages = calculatePages(totalPages, firstMobileItemsPerPage, otherMobileCardsPerPage);
  const tabletPages = calculatePages(totalPages, firstTabletItemsPerPage, otherTabletCardsPerPage);
  const desktopPages = calculatePages(
    totalPages,
    firstDesktopItemsPerPage,
    otherDesktopCardsPerPage,
  );

  const currentCardsPerPage = getCurrentCardsPerPage();
  const calculatedFirstIndexes = calculateFirstIndexes();

  useEffect(() => {
    if (rebuildedNews && rebuildedNews?.length > 0) {
      const calculationOfLastElements = currentPage * currentCardsPerPage - 1 >= totalPages;
      let indexOfLastItem: number;
      let indexOfFirstItem: number;

      if (currentPage === 1) {
        indexOfLastItem = currentPage * currentCardsPerPage;
        indexOfFirstItem = indexOfLastItem - currentCardsPerPage;
      } else if (currentPage > 1 && calculationOfLastElements && calculatedFirstIndexes) {
        indexOfLastItem = totalPages;
        if (breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile) {
          indexOfFirstItem = totalPages - calculatedFirstIndexes.firstIndexForLastMobilePage;
        } else if (breakpointsForMarkup?.isTablet) {
          indexOfFirstItem = totalPages - calculatedFirstIndexes.firstIndexForLastTabletPage;
        } else {
          indexOfFirstItem = totalPages - calculatedFirstIndexes.firstIndexForLastDesktopPage;
        }
      } else {
        indexOfLastItem = currentPage * currentCardsPerPage - 1;
        indexOfFirstItem = indexOfLastItem - currentCardsPerPage;
      }
      //   const indexOfLastItem =
      //     currentPage === 1
      //       ? currentPage * currentCardsPerPage
      //       : currentPage * currentCardsPerPage - 1;
      // const indexOfFirstItem = indexOfLastItem - currentCardsPerPage;

      const items = rebuildedNews.slice(indexOfFirstItem, indexOfLastItem);
      setCurrentItems(items);
    }
  }, [popularNews, newsByKeyword, newsByCategory, newsByDate, filteredNews, currentPage]);

  // Розрахунок кількості сторінок для кожного типу пристрою
  function calculatePages(total: number, firstPageCount: number, otherPageCount: number) {
    const pages = [firstPageCount];
    let remainingItems = total - firstPageCount;

    while (remainingItems > 0) {
      pages.push(otherPageCount);
      remainingItems -= otherPageCount;
    }
    return pages;
  }

  // Визначення кількості об'єктів новин на сторінці в залежності від типу пристрою
  function getCurrentCardsPerPage() {
    if (breakpointsForMarkup?.isMobile || breakpointsForMarkup?.isNothing) {
      return mobilePages[currentPage - 1] || 0;
    } else if (breakpointsForMarkup?.isTablet) {
      return tabletPages[currentPage - 1] || 0;
    } else {
      return desktopPages[currentPage - 1] || 0;
    }
  }

  //Вирахування залишку карток на останній сторінці
  function calculateRemainingCards(cards: number[], totalCards: number): number {
    // Вираховуємо суму всіх чисел, окрім останнього елемента
    const sum = cards && cards.slice(0, -1).reduce((acc, num) => acc + num, 0);

    // Віднімаємо вираховану суму від загальної кількості карток
    const remainingCards = totalCards - sum;

    return remainingCards;
  }

  //Калькуляція першого індексу для останніх сторінок
  function calculateFirstIndexes() {
    try {
      const firstIndexForLastMobilePage = calculateRemainingCards(mobilePages, totalPages);
      const firstIndexForLastTabletPage = calculateRemainingCards(tabletPages, totalPages);
      const firstIndexForLastDesktopPage = calculateRemainingCards(desktopPages, totalPages);

      const firstIndexes = {
        firstIndexForLastMobilePage,
        firstIndexForLastTabletPage,
        firstIndexForLastDesktopPage,
      };

      return firstIndexes;
    } catch (error: any) {
      return console.error(error.message);
    }
  }

  // function getFirstPageCount() {
  //   if (breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile) {
  //     return 4;
  //   } else if (breakpointsForMarkup?.isTablet) {
  //     return 7;
  //   } else {
  //     return 8;
  //   }
  // }

  // function getOtherPageCount() {
  //   if (breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile) {
  //     return 5;
  //   } else if (breakpointsForMarkup?.isTablet) {
  //     return 8;
  //   } else {
  //     return 9;
  //   }
  // }

  //Розрахунок необхідної кількості кнопок пагінації
  const pageNumbers: number[] = [];

  let pageQuantity: number;
  if (currentPage !== 1) {
    if (breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile) {
      pageQuantity = Math.ceil(totalPages / currentCardsPerPage + 1);
    } else {
      pageQuantity = Math.ceil(totalPages / currentCardsPerPage);
    }
  } else {
    pageQuantity = Math.ceil(totalPages / currentCardsPerPage);
  }

  for (let i = 1; i <= pageQuantity; i++) {
    pageNumbers.push(i);
  }

  return {
    currentItems,
    pageNumbers,
    currentPage,
    setCurrentPage,
  };
};

export default usePagination;
