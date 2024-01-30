import React, { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useAuthRedux, useDB, useNewsAPI, useFiltersAction } from 'reduxStore/hooks';

import { useNotification } from 'contexts';
import { useActiveLinks, useChooseRenderingNews, useToast } from 'hooks';

import { NewsList } from 'components';
import { Loader, Notification, PlugImage } from 'ui';

import { usePagination } from './hooks';
import { Pagination } from './subcomponents';

const TODAY_HOT_NEWS = '1';

const HomePage: FC = () => {
  const {
    isLoadingAPIData,
    errorAPI,
    headline,
    newsByCategory,
    newsByDate,
    newsByKeyword,
    fetchPopular,
  } = useNewsAPI();
  const { isLoadingDBData, getSavedNews } = useDB();
  const { isAuthenticated, authError } = useAuthRedux();
  const { openToast, setOpenToast } = useNotification();
  const { showErrorToast } = useToast();

  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  const { rebuildedNews } = useChooseRenderingNews({ activeLinks });
  const { hasResults } = useFiltersAction();
  const { currentItems, currentPage, pageNumbers, setCurrentPage } = usePagination(
    rebuildedNews ?? [],
  );

  const is429ErrorAPI = errorAPI?.toString().includes('429');

  useEffect(() => {
    fetchPopular(TODAY_HOT_NEWS);
    if (isAuthenticated) getSavedNews();
  }, [fetchPopular, getSavedNews, isAuthenticated]);

  useEffect(() => {
    if (newsByKeyword || newsByCategory || newsByDate) setOpenToast(true);
  }, [newsByKeyword, newsByCategory, newsByDate]);

  const showLoader = isLoadingAPIData || isLoadingDBData || hasResults === 'loading';
  const showPlugImage = (rebuildedNews && rebuildedNews.length === 0) || hasResults === 'empty';
  const additionalRequests =
    (newsByKeyword && newsByKeyword.length > 0) ||
    (newsByCategory && newsByCategory.length > 0) ||
    (newsByDate && newsByDate.length > 0);
  const showToastResults = !showLoader && additionalRequests;
  const showErrorToastMessage = (authError && authError.message) || errorAPI;

  return (
    <>
      {showLoader ? (
        <Loader variant='generalSection' />
      ) : (
        <>
          {showPlugImage || is429ErrorAPI ? (
            <PlugImage variant='page' />
          ) : (
            <>
              {headline && (
                <h2 className='mb-6 text-giant font-bold dark:text-whiteBase'>{headline}</h2>
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
      {showErrorToastMessage && (
        <Notification
          openToast={openToast}
          setOpenToast={setOpenToast}
          title={`${authError?.message ? 'Authorisation error' : 'News API Error'}`}
          description={authError?.message || errorAPI ? showErrorToast() : ''}
        />
      )}
      {showToastResults && (
        <Notification
          variant='non-interactive'
          openToast={openToast}
          setOpenToast={setOpenToast}
          title='Found news'
          description={`There are ${rebuildedNews.length} news has been found`}
        />
      )}
    </>
  );
};

export default HomePage;
