import React, { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import {
  useAuthRedux,
  useDB,
  useNewsAPI,
  useFiltersAction,
  useAppSelector,
} from 'reduxStore/hooks';

import { useNotification } from 'contexts';
import { useActiveLinks, useChooseRenderingNews, useToast } from 'hooks';

import { NewsList } from 'components';
import { Loader, Notification, PlugImage } from 'ui';

import { usePagination } from './hooks';
import { Pagination } from './subcomponents';
import { selectHasAPIError } from 'reduxStore/newsAPI';

const HomePage: FC = () => {
  const { isLoadingAPIData, headline, newsByCategory, newsByDate, newsByKeyword, fetchPopular } =
    useNewsAPI();
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

  const errorAPI = useAppSelector(selectHasAPIError);
  const isErrorAPI = errorAPI?.toString().includes('429');

  useEffect(() => {
    fetchPopular('1');
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
  return (
    <>
      {showLoader ? (
        <Loader variant='generalSection' />
      ) : (
        <>
          {showPlugImage || isErrorAPI ? (
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
      {authError && authError.message && (
        <Notification
          openToast={openToast}
          setOpenToast={setOpenToast}
          title={`${authError?.message && 'Authorisation error'}`}
          description={authError?.message ? showErrorToast() : ''}
        />
      )}
      {isErrorAPI && (
        <Notification
          openToast={openToast}
          setOpenToast={setOpenToast}
          title={`429`}
          description={'Too many requests'}
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
