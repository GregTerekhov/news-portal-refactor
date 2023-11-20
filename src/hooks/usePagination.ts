import { useEffect, useState } from 'react';

import { PartialVotedNewsArray } from 'types';

import useWindowWidth from './useWindowWidth';
import useNewsAPICollector from './useNewsAPICollector';
import useFilterCollector from './useFilterCollector';

let accumulatePages = 8;

const usePagination = (rebuildedNews: PartialVotedNewsArray) => {
  const { breakpointsForMarkup } = useWindowWidth() || {
    breakpointsForMarkup: null,
  };

  const { popularNews, newsByKeyword, newsByCategory, newsByDate } = useNewsAPICollector();
  const { filteredNews } = useFilterCollector();

  const [currentPage, setCurrentPage] = useState(1);
  const [accPage, setAccPage] = useState(() => setStartIdx());
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
  // console.log('currentCardsPerPage', currentCardsPerPage);
  // console.log('mobilePages', mobilePages);
  useEffect(() => {
    if (rebuildedNews && rebuildedNews?.length > 0) {
      if (currentPage !== 1) {
        setAccPage(accPage + currentCardsPerPage);
      }
      const indexOfLastItem =
        currentPage === 1
          ? currentPage * currentCardsPerPage
          : currentPage * currentCardsPerPage - 1;
      const indexOfFirstItem = indexOfLastItem - currentCardsPerPage;

      console.log(accumulatePages);
      const items = rebuildedNews.slice(indexOfFirstItem, indexOfLastItem);
      console.log('ITMES', items);
      console.log('FRST', indexOfFirstItem);
      console.log('LST', indexOfLastItem);
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
      // console.log('PAGES', pages);
      // console.log('REMAIN', remainingItems);
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

  // Визначення кількості об'єктів новин на сторінці в залежності від типу пристрою
  function setStartIdx() {
    if (breakpointsForMarkup?.isMobile || breakpointsForMarkup?.isNothing) {
      return 4;
    } else if (breakpointsForMarkup?.isTablet) {
      return 7;
    } else {
      return 8;
    }
  }

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPages / currentCardsPerPage); i++) {
    pageNumbers.push(i);
  }

  // console.log('CUR_I', currentItems);

  return {
    currentItems,
    pageNumbers,
    currentPage,
    setCurrentPage,
  };
};

export default usePagination;
