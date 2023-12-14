import React, { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useNotification } from 'contexts';
import {
  useActiveLinks,
  useAuthCollector,
  useChooseRenderingNews,
  useFilterCollector,
  useNewsAPICollector,
  useNewsDBCollector,
} from 'hooks';

import { NewsList } from 'components';
import { Loader, Notification, PlugImage } from 'ui';

import { Pagination } from './subcomponents';
import { usePagination } from './hooks';

const HomePage: FC = () => {
  const { isLoadingAPIData, headline, fetchPopular } = useNewsAPICollector();
  const { isLoadingDBData, getSavedNews } = useNewsDBCollector();
  const { isAuthenticated } = useAuthCollector();
  const { openToast, setOpenToast } = useNotification();
  // const isAuthenticated = true;
  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  const { rebuildedNews } = useChooseRenderingNews({ activeLinks });
  const { hasResults } = useFilterCollector();
  const { currentItems, currentPage, pageNumbers, setCurrentPage } = usePagination(
    rebuildedNews ?? [],
  );

  useEffect(() => {
    fetchPopular('1');

    if (isAuthenticated) {
      getSavedNews();
    }
  }, [fetchPopular, getSavedNews, isAuthenticated]);

  return (
    <div>
      {isLoadingAPIData ||
      (isLoadingDBData && rebuildedNews && currentItems?.length === 0) ||
      hasResults === 'loading' ? (
        <Loader variant='generalSection' />
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
    </div>
  );
};

export default HomePage;
