import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Loader, NewsList, Pagination, PlugImage } from 'components';
import {
  selectLoading,
  selectPopular,
  selectSearchByKeyword,
  selectByCategory,
  fetchPopularNews,
} from 'redux/newsAPI';
import { useItemsPerPage, useWindowWidth } from 'hooks';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { addNews, fetchAllNews, selectSavedNews } from 'redux/newsDatabase';
import { PartialVotedNewsArray } from 'types/news';
import { calculatePages, rebuildNewsArray } from 'helpers';
import { selectFilters } from 'redux/filterSlice';
// import { saveUnsavedChanges } from 'redux/newsDatabase/newsDataBaseSlice';

const HomePage = () => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  const itemsPerPage = useItemsPerPage();

  const dispatch = useAppDispatch();
  const popularData = useAppSelector(selectPopular);
  const searchResults = useAppSelector(selectSearchByKeyword);
  const searchByCategory = useAppSelector(selectByCategory);
  const isLoading = useAppSelector(selectLoading);
  const savedNews = useAppSelector(selectSavedNews);
  const filteredNews = useAppSelector(selectFilters);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentItems, setCurrentItems] = useState<PartialVotedNewsArray>([]);
  const [changesHappened, setChangesHappened] = useState<boolean>(false);


  // console.log('filteredNews', filteredNews);
  // console.log('popularData', popularData);
  // console.log('currentItems', currentItems);
  // console.log('searchResults', searchResults);
  // console.log('searchByCategory', searchByCategory);
  // console.log('savedNews', savedNews);

  useEffect(() => {
    dispatch(fetchPopularNews('1'));
    dispatch(fetchAllNews());
  }, [dispatch]);

  const handleChangeVotes = () => {
    setChangesHappened(true);
  };

  useLayoutEffect(() => {
    if (changesHappened) {
      console.log('Клік по фаворитах, або по посиланню відбувся');
      dispatch(addNews(savedNews));
      // dispatch(saveUnsavedChanges());
      setChangesHappened(false);
    }
  }, [changesHappened]);

  const chooseRenderingNews = () => {
    if (searchResults && searchResults?.length > 0) {
      const searchResultsNews = rebuildNewsArray(searchResults);

      return searchResultsNews;
    } else if (searchByCategory && searchByCategory.length > 0) {
      const newsByCategory = rebuildNewsArray(searchByCategory);

      return newsByCategory;
    } else if (filteredNews && filteredNews.length > 0) {
      return filteredNews;
    } else {
      const popularNews = rebuildNewsArray(popularData);

      return popularNews;
    }
  };

  const rebuildedNews = chooseRenderingNews();

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
  }, [popularData, searchResults, searchByCategory, filteredNews, currentPage, itemsPerPage]);

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
          {rebuildedNews && rebuildedNews.length === 0 ? (
            <PlugImage variant='page' />
          ) : (
            <>
              <NewsList
                currentItems={currentItems}
                currentPage={currentPage}
                onChange={handleChangeVotes}
              />
              <Pagination
                pageNumbers={pageNumbers}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
