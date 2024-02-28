import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthRedux, useDB, useNewsAPI, useFiltersAction } from 'reduxStore/hooks';

import { useNotification } from 'contexts';
import { useActiveLinks, useChooseRenderingNews } from 'hooks';

import { NewsList, Toast } from 'components';
import { Loader, PlugImage } from 'ui';

import { usePagination } from './hooks';
import { Pagination } from './subcomponents';

const TODAY_HOT_NEWS = 1;

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
  const { setOpenToast } = useNotification();

  const activeLinks = useActiveLinks();

  const { rebuildedNews } = useChooseRenderingNews({ activeLinks });
  const { hasResults } = useFiltersAction();
  const { currentItems, currentPage, pageNumbers, setCurrentPage } = usePagination(
    rebuildedNews ?? [],
  );

  const is429ErrorAPI = errorAPI?.toString().includes('429');
  const navigate = useNavigate();

  useEffect(() => {
    if (errorAPI) {
      if (errorAPI >= 500) {
        navigate('/serverError');
      }
    }
  }, [errorAPI]);

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
      {showErrorToastMessage && <Toast variant='interactive' status='error' />}
      {showToastResults && <Toast variant='non-interactive' status='info' />}
    </>
  );
};

export default HomePage;
