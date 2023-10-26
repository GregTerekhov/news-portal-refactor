// import { useState } from 'react';
// import { PartialVotedNewsArray } from 'types/news';
// import { useWindowWidth } from './useWindowWidth';
// import useItemsPerPage from './useItemsPerPage';
// import { calculatePages } from 'helpers';

// const usePagination = (newsData: PartialVotedNewsArray) => {
//   const { breakpointsForMarkup } = useWindowWidth() ?? {
//     breakpointsForMarkup: null,
//   };
//   const itemsPerPage = useItemsPerPage();

//   const [currentPage, setCurrentPage] = useState(1);
//   const [currentItems, setCurrentItems] = useState<PartialVotedNewsArray>([]);

//   const totalResults = newsData?.length || 0;
//   const mobileCardsPerPage = 5; // Кількість новин для мобільного пристрою
//   const tabletCardsPerPage = 8; // Кількість новин для таблетки
//   const desktopCardsPerPage = 9; // Кількість новин для десктопу

//   const mobilePages = calculatePages(totalResults, mobileCardsPerPage);
//   const tabletPages = calculatePages(totalResults, tabletCardsPerPage);
//   const desktopPages = calculatePages(totalResults, desktopCardsPerPage);

//   const currentCardsPerPage = getCurrentCardsPerPage();

//   if (Array.isArray(newsData)) {
//     // Виконуємо код для розділення сторінок та оновлення компонента
//     const indexOfLastItem = currentPage * currentCardsPerPage;
//     const indexOfFirstItem = indexOfLastItem - currentCardsPerPage;
//     const items = newsData?.slice(indexOfFirstItem, indexOfLastItem);
//     setCurrentItems(items);
//   }
//   // useEffect(() => {

//   // }, [newsData, currentPage, itemsPerPage]);

//   function getCurrentCardsPerPage() {
//     if (breakpointsForMarkup?.isMobile || breakpointsForMarkup?.isNothing) {
//       // Мобільний пристрій
//       return mobilePages[currentPage - 1] || 0;
//     } else if (breakpointsForMarkup?.isTablet) {
//       // Таблетка
//       return tabletPages[currentPage - 1] || 0;
//     } else {
//       // Десктоп
//       return desktopPages[currentPage - 1] || 0;
//     }
//   }

//   const pageNumbers = [];
//   for (let i = 1; i <= Math.ceil((newsData?.length || 0) / itemsPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   return {
//     currentItems,
//     pageNumbers,
//     currentPage,
//     setCurrentPage,
//   };
// };

// export default usePagination;

// Ваш хук usePagination.ts
import { useState, useEffect } from 'react';
import { PartialVotedNewsArray } from 'types/news';

interface PaginationHookProps {
  totalItems: number;
  itemsPerPage: number;
}

interface PaginationHook {
  currentPage: number;
  currentItems: PartialVotedNewsArray;
  pageNumbers: number[];
  changePage: (pageNumber: number) => void;
}

const usePagination = ({ totalItems, itemsPerPage }: PaginationHookProps): PaginationHook => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentItems, setCurrentItems] = useState<PartialVotedNewsArray>([]); //
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);

  const calculatePages = (totalItems: number, itemsPerPage: number) =>
    Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    // Розраховуємо кількість сторінок
    const totalPages = calculatePages(totalItems, itemsPerPage);

    // Створюємо масив номерів сторінок
    const pages: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    setPageNumbers(pages);

    // Розраховуємо і встановлюємо поточний список елементів для поточної сторінки
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const items = currentItems?.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentItems(items);
  }, [currentPage, totalItems, itemsPerPage]);

  const changePage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= pageNumbers.length) {
      setCurrentPage(pageNumber);
    }
  };

  return {
    currentPage,
    currentItems,
    pageNumbers,
    changePage,
  };
};

export default usePagination;
