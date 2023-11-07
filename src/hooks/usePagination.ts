import { useEffect, useState } from 'react';
import { PartialVotedNewsArray } from 'types';
import { useWindowWidth } from './useWindowWidth';
import useItemsPerPage from './useItemsPerPage';
import { calculatePages } from 'helpers';
import { useAppSelector } from 'redux/hooks';
import {
  selectByCategory,
  selectByDate,
  selectPopular,
  selectSearchByKeyword,
} from 'redux/newsAPI';
import { selectFilters } from 'redux/filterSlice';

const usePagination = (rebuildedNews: PartialVotedNewsArray) => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  const itemsPerPage = useItemsPerPage();

  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState<PartialVotedNewsArray>([]);

  const popularData = useAppSelector(selectPopular);
  const searchResults = useAppSelector(selectSearchByKeyword);
  const searchByCategory = useAppSelector(selectByCategory);
  const searchByDate = useAppSelector(selectByDate);
  const filteredNews = useAppSelector(selectFilters);

  const totalResults = (rebuildedNews && rebuildedNews?.length) || 0;
  const mobileCardsPerPage = 5; // Кількість новин для мобільного пристрою
  const tabletCardsPerPage = 8; // Кількість новин для таблетки
  const desktopCardsPerPage = 9; // Кількість новин для десктопу

  const mobilePages = calculatePages(totalResults, mobileCardsPerPage);
  const tabletPages = calculatePages(totalResults, tabletCardsPerPage);
  const desktopPages = calculatePages(totalResults, desktopCardsPerPage);

  const currentCardsPerPage = getCurrentCardsPerPage();

  useEffect(() => {
    if (rebuildedNews && rebuildedNews?.length > 0) {
      // Виконуємо код для розділення сторінок та оновлення компонента
      const indexOfLastItem = currentPage * currentCardsPerPage;
      const indexOfFirstItem = indexOfLastItem - currentCardsPerPage;
      const items = rebuildedNews?.slice(indexOfFirstItem, indexOfLastItem);
      setCurrentItems(items);
    }
  }, [
    popularData,
    searchResults,
    searchByCategory,
    searchByDate,
    filteredNews,
    currentPage,
    itemsPerPage,
  ]);

  function getCurrentCardsPerPage() {
    if (breakpointsForMarkup?.isMobile || breakpointsForMarkup?.isNothing) {
      // Мобільний пристрій
      return mobilePages[currentPage - 1] || 0;
    } else if (breakpointsForMarkup?.isTablet) {
      // Таблетка
      return tabletPages[currentPage - 1] || 0;
    } else {
      // Десктоп
      return desktopPages[currentPage - 1] || 0;
    }
  }

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil((rebuildedNews?.length || 0) / itemsPerPage); i++) {
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
