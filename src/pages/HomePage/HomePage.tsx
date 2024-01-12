import React, { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useAuthRedux, useDB, useNewsAPI, useFiltersAction } from 'reduxStore/hooks';

import { useNotification } from 'contexts';
import { useActiveLinks, useChooseRenderingNews } from 'hooks';

import { NewsList } from 'components';
import { Loader, Notification, PlugImage } from 'ui';

import { Pagination, TooManyRequests } from './subcomponents';
import { usePagination } from './hooks';
import useNewsAPICollector from 'reduxStore/hooks/useNewsAPICollector';

const HomePage: FC = () => {
  const { isLoadingAPIData, headline, fetchPopular } = useNewsAPI();
  const { isLoadingDBData, getSavedNews } = useDB();
  const { isAuthenticated } = useAuthRedux();
  const { openToast, setOpenToast } = useNotification();

  const [openSearchToast, setOpenSearchToast] = useState<boolean>(false);

  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  const { rebuildedNews } = useChooseRenderingNews({ activeLinks });
  const { hasResults } = useFiltersAction();
  const { currentItems, currentPage, pageNumbers, setCurrentPage } = usePagination(
    rebuildedNews ?? [],
  );
  const { errorAPI, newsByDate, newsByKeyword, newsByCategory } = useNewsAPICollector();

  const tooManyReq = errorAPI?.toString().includes('429');

  useEffect(() => {
    fetchPopular('1');
    if (isAuthenticated) {
      getSavedNews();
    }
  }, [fetchPopular, getSavedNews, isAuthenticated]);

  //эффект для временного вывода результата поиска в консоли. Тостик временно не работает
  useEffect(() => {
    const byDate = newsByDate.length > 0;
    const byKeyword = newsByKeyword.length > 0;
    const byCategories = newsByCategory.length > 0;

    if (byDate || byKeyword || byCategories) {
      setOpenSearchToast(true);
    }
  }, [newsByDate, newsByKeyword, newsByCategory]);

  const byDate = newsByDate.length > 0;
  const byKeyword = newsByKeyword.length > 0;
  const byCategories = newsByCategory.length > 0;

  return (
    <div>
      {isLoadingAPIData ||
      (isLoadingDBData && rebuildedNews && currentItems?.length === 0) ||
      hasResults === 'loading' ? (
        <Loader variant='generalSection' />
      ) : tooManyReq ? (
        <TooManyRequests />
      ) : (
        <>
          {(rebuildedNews && rebuildedNews.length === 0) || hasResults === 'empty' ? (
            <PlugImage variant='page' />
          ) : (
            <>
              {headline && (
                <h2 className='dark:text-whiteBase text-giant font-bold mb-6'>{headline}</h2>
              )}
              <NewsList currentItems={currentItems} currentPage={currentPage} />
              <Pagination
                pageNumbers={pageNumbers}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </>
          )}
        </>
      )}
      {isAuthenticated && (
        <Notification
          variant='non-interactive'
          openToast={openToast}
          setOpenToast={setOpenToast}
          title='Welcome'
          description='Welcome to New York Times News Viewer'
        />
      )}
      {(byDate || byKeyword || byCategories) && (
        <Notification
          variant='non-interactive'
          openToast={openSearchToast}
          setOpenToast={setOpenSearchToast}
          title='Search'
          description={`There are ${rebuildedNews.length} news has been found`}
        />
      )}
    </div>
  );
};

export default HomePage;
