import React, { FC, useEffect } from 'react';

import { useAuthRedux, useDB, useNewsAPI } from 'reduxStore/hooks';
import { PageTemplate } from '../template';

import { useActiveLinks, useChooseRenderingNews } from 'hooks';

import { NewsList } from 'components';

import { usePagination } from './hooks';
import { Pagination } from './subcomponents';

const TODAY_HOT_NEWS = 1;

const HomePage: FC = () => {
  const { headline, fetchPopular } = useNewsAPI();
  const { getSavedNews } = useDB();
  const { isAuthenticated } = useAuthRedux();

  const activeLinks = useActiveLinks();

  const { rebuildedNews } = useChooseRenderingNews(activeLinks);
  const { currentItems, pageNumbers, currentPage, setCurrentPage } = usePagination(
    rebuildedNews ?? [],
  );

  useEffect(() => {
    fetchPopular({ period: TODAY_HOT_NEWS });
    if (isAuthenticated) getSavedNews();
  }, [fetchPopular, getSavedNews, isAuthenticated]);

  return (
    <PageTemplate>
      {headline && <h2 className='mb-6 text-giant font-bold dark:text-whiteBase'>{headline}</h2>}
      <NewsList currentItems={currentItems} currentPage={currentPage} />
      <Pagination
        pageNumbers={pageNumbers}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </PageTemplate>
  );
};

export default HomePage;
