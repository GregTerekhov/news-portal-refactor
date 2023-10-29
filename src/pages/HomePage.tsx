import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Loader, NewsList, Pagination } from 'components';
import { selectLoading, selectPopular, fetchPopularNews } from 'redux/newsAPI';
import { useItemsPerPage, useWindowWidth } from 'hooks';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { addNews, fetchAllNews, selectAllNews } from 'redux/newsDatabase';
import { PartialVotedNewsArray } from 'types/news';
import { calculatePages, rebuildNewsArray } from 'helpers';

const HomePage = () => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  const itemsPerPage = useItemsPerPage();

  const dispatch = useAppDispatch();
  const popularData = useAppSelector(selectPopular);
  const isLoading = useAppSelector(selectLoading);
  const votedNews = useAppSelector(selectAllNews);
  const rebuildedNews = rebuildNewsArray(popularData ?? []);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentItems, setCurrentItems] = useState<PartialVotedNewsArray>([]);

  useEffect(() => {
    dispatch(fetchPopularNews('1'));
    dispatch(fetchAllNews());
  }, [dispatch]);

  useLayoutEffect(() => {
    console.log('After unmount', votedNews);
    dispatch(addNews(votedNews));
  }, [votedNews]);

  const totalResults = (rebuildedNews && rebuildedNews?.length) || 0;

  const mobileCardsPerPage = 5; // Кількість новин для мобільного пристрою
  const tabletCardsPerPage = 8; // Кількість новин для таблетки
  const desktopCardsPerPage = 9; // Кількість новин для десктопу

  const mobilePages = calculatePages(totalResults, mobileCardsPerPage);
  const tabletPages = calculatePages(totalResults, tabletCardsPerPage);
  const desktopPages = calculatePages(totalResults, desktopCardsPerPage);

  const currentCardsPerPage = getCurrentCardsPerPage();

  useEffect(() => {
    if (popularData && popularData?.length > 0 && rebuildedNews && rebuildedNews?.length > 0) {
      // Виконуємо код для розділення сторінок та оновлення компонента
      const indexOfLastItem = currentPage * currentCardsPerPage;
      const indexOfFirstItem = indexOfLastItem - currentCardsPerPage;
      const items = rebuildedNews?.slice(indexOfFirstItem, indexOfLastItem);
      setCurrentItems(items);
    }
  }, [popularData, currentPage, itemsPerPage]);

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

  return (
    <div>
      {isLoading && rebuildedNews && currentItems?.length === 0 ? (
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
