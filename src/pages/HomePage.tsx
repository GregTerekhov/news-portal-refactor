import React, { useEffect, useState } from 'react';
import { Loader, NewsList, Pagination } from 'components';
import { selectLoading, selectPopular, fetchPopularNews } from 'redux/newsAPI';
import { useItemsPerPage, useWindowWidth } from 'hooks';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { addNews, fetchAllNews, selectAllNews } from 'redux/newsDatabase';
import { PartialVotedNewsArray } from 'types/news';
import { calculatePages, rebuildNewsArray } from 'helpers';
// import { clearVotedNews } from 'redux/votedNewsSlice';

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
  // const [hidden, setHidden] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchPopularNews('1'));
    dispatch(fetchAllNews());
  }, [dispatch]);

  useEffect(() => {
    const hidePage = document.visibilityState === 'hidden';

    const handleVisibilityChange = () => {
      if (hidePage) {
        console.log('hidePage', hidePage);
        // setHidden(true);
        console.log('Page has been hidden!');
        console.log('votedNews', votedNews);
        // if (votedNews && votedNews.length !== 0) {
        // dispatch(addNews(votedNews));
        // }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      console.log('After unmount');
      // if (votedNews && votedNews.length !== 0) {
      dispatch(addNews(votedNews));
      // }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

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

  if (votedNews && votedNews.length !== 0) {
    console.log('votedNews', votedNews);
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
