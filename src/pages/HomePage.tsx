import React, { useEffect, useState } from 'react';
import { Loader, NewsList, Pagination } from 'components';
import { selectLoading, selectPopular, fetchPopularNews } from 'redux/newsAPI';
import { selectArticles } from 'redux/article';
import { selectNewswire } from 'redux/newswire';
import { useItemsPerPage, useWindowWidth } from 'hooks';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { addNews, fetchAllNews, selectAllNews } from 'redux/newsDatabase';
import { PartialGeneralNewsArray } from 'types/news';
import { calculatePages, rebuildNewsArray } from 'helpers';
import { useSelector } from 'react-redux';

// import { clearVotedNews } from 'redux/votedNewsSlice';

const HomePage = () => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  const itemsPerPage = useItemsPerPage();

  const dispatch = useAppDispatch();
  const popularData = useAppSelector(selectPopular);
  const newswireData = useSelector(selectNewswire);
  const articleData = useSelector(selectArticles);

  const isLoading = useAppSelector(selectLoading);
  const votedNews = useAppSelector(selectAllNews);

  const [distributeData, setDistributeData] = useState(null);
  const rebuildedNews = rebuildNewsArray(distributeData);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentItems, setCurrentItems] = useState<PartialGeneralNewsArray>([]);

  useEffect(() => {
    console.log('WIRRE', newswireData);
    // const newsClarify = 0;
    console.log('ART', articleData);

    if (articleData.newsData.length > 0 && articleData.newsData.length <= 10) {
      setDistributeData(articleData);
      return;
    }
    setDistributeData(popularData);
  }, [popularData, articleData, newswireData]);

  useEffect(() => {
    dispatch(fetchPopularNews('1'));
    dispatch(fetchAllNews());
  }, [dispatch]);

  useEffect(() => {
    // const hidePage = document.visibilityState === 'hidden';

    const handleVisibilityChange = () => {
      // if (hidePage) {
      // console.log('hidePage', hidePage);
      // console.log('Page has been hidden!');
      // console.log('votedNews', votedNews);
      // }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      console.log('After unmount');
      dispatch(addNews(votedNews));
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
      // console.log('ITEMS', items);
      setCurrentItems(items);
    }
  }, [distributeData, currentPage, itemsPerPage]);

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
    // console.log('votedNews', votedNews);
  }

  // console.log('currentItems', currentItems);

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
  );
};

export default HomePage;
