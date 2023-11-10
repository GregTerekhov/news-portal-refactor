import { useEffect, useState } from 'react';
import { PartialVotedNewsArray } from 'types';
import { useWindowWidth } from './useWindowWidth';
import { useAppSelector } from 'redux/hooks';
import {
  selectByCategory,
  selectByDate,
  selectPopular,
  selectSearchByKeyword,
} from 'redux/newsAPI';
import { selectFilters } from 'redux/filterSlice';

const usePagination = (rebuildedNews: PartialVotedNewsArray) => {
  const { breakpointsForMarkup } = useWindowWidth() || {
    breakpointsForMarkup: null,
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState<PartialVotedNewsArray>([]);

  const popularData = useAppSelector(selectPopular);
  const searchResults = useAppSelector(selectSearchByKeyword);
  const searchByCategory = useAppSelector(selectByCategory);
  const searchByDate = useAppSelector(selectByDate);
  const filteredNews = useAppSelector(selectFilters);

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
  useEffect(() => {
    if (rebuildedNews && rebuildedNews?.length > 0) {
      const indexOfLastItem = currentPage * currentCardsPerPage;
      const indexOfFirstItem = indexOfLastItem - currentCardsPerPage;

      const items = rebuildedNews.slice(indexOfFirstItem, indexOfLastItem);
      setCurrentItems(items);
    }
  }, [popularData, searchResults, searchByCategory, searchByDate, filteredNews, currentPage]);

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

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPages / currentCardsPerPage); i++) {
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
