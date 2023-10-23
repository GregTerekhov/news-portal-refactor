import React, { useState, useEffect } from 'react';
import { Loader, NewsList, Pagination } from 'components';
import { selectLoading, selectPopular, fetchPopularNews } from 'redux/newsAPI';
import { useItemsPerPage, useWindowWidth } from 'hooks';
import { calculatePages } from 'helpers';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

const HomePage = () => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = useItemsPerPage();
  const [currentItems, setCurrentItems] = useState<any[]>([]);

  const popularData = useAppSelector(selectPopular);
  const isLoading = useAppSelector(selectLoading);
  const dispatch = useAppDispatch();
  // const votedNews = useAppSelector((state) => state.votedNews);
  // console.log('votedNews', votedNews);

  useEffect(() => {
    dispatch(fetchPopularNews('1'));
  }, []);

  useEffect(() => {
    const hidePage = document.hidden;

    const handleVisibilityChange = () => {
      if (hidePage) {
        console.log('Page has been hidden');
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      console.log('After unmount');
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const totalResults = popularData?.length || 0;
  const mobileCardsPerPage = 5; // Кількість новин для мобільного пристрою
  const tabletCardsPerPage = 8; // Кількість новин для таблетки
  const desktopCardsPerPage = 9; // Кількість новин для десктопу

  const mobilePages = calculatePages(totalResults, mobileCardsPerPage);
  const tabletPages = calculatePages(totalResults, tabletCardsPerPage);
  const desktopPages = calculatePages(totalResults, desktopCardsPerPage);

  const getCurrentCardsPerPage = () => {
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
  };

  useEffect(() => {
    if (Array.isArray(popularData)) {
      // Виконуємо код для розділення сторінок та оновлення компонента
      const currentCardsPerPage = getCurrentCardsPerPage();
      const indexOfLastItem = currentPage * currentCardsPerPage;
      const indexOfFirstItem = indexOfLastItem - currentCardsPerPage;
      const items = popularData?.slice(indexOfFirstItem, indexOfLastItem);
      setCurrentItems(items);
    }
  }, [popularData, currentPage, itemsPerPage]);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil((popularData?.length || 0) / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      {isLoading && currentItems?.length === 0 ? (
        <Loader />
      ) : (
        <>
          <NewsList currentItems={currentItems} currentPage={currentPage} />
          <Pagination
            pageNumbers={pageNumbers}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </div>
    // <PlugImage variant='page' />
  );
};

export default HomePage;
