import React, { useState, useEffect } from 'react';
import { Loader, NewsList, Pagination } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularNews, popularSelectors } from 'redux/favourite';
import { useItemsPerPage, useWindowWidth } from 'hooks';
import { calculatePages } from 'helpers';

const HomePage = () => {
  const [getPop, setGetPop] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  const popularData = useSelector(popularSelectors);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = useItemsPerPage();
  const [currentItems, setCurrentItems] = useState<any[]>([]);

  const totalResults = popularData?.results?.length || 0;
  const mobileCardsPerPage = 5; // Кількість новин для мобільного пристрою
  const tabletCardsPerPage = 8; // Кількість новин для таблетки
  const desktopCardsPerPage = 9; // Кількість новин для десктопу

  const mobilePages = calculatePages(totalResults, mobileCardsPerPage);
  const tabletPages = calculatePages(totalResults, tabletCardsPerPage);
  const desktopPages = calculatePages(totalResults, desktopCardsPerPage);

  useEffect(() => {
    if (!getPop) {
      console.log(`GET POP`);
      dispatch(fetchPopularNews());
      setGetPop(true);
    }
  }, [dispatch]);

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
    if (Array.isArray(popularData?.results)) {
      // Виконуємо код для розділення сторінок та оновлення компонента
      const currentCardsPerPage = getCurrentCardsPerPage();
      const indexOfLastItem = currentPage * currentCardsPerPage;
      const indexOfFirstItem = indexOfLastItem - currentCardsPerPage;
      const items = popularData?.results.slice(indexOfFirstItem, indexOfLastItem);
      setCurrentItems(items);
    }
  }, [popularData?.results, currentPage, itemsPerPage]);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil((popularData?.results.length || 0) / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      {popularData?.results && popularData?.results.length > 0 && currentItems?.length > 0 ? (
        <>
          <NewsList currentItems={currentItems} currentPage={currentPage} />
          <Pagination
            pageNumbers={pageNumbers}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      ) : (
        <Loader />
      )}
    </div>
    // <PlugImage variant='page' />
  );
};

export default HomePage;
