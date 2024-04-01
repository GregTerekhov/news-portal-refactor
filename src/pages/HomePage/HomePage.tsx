import React, { FC, useEffect } from 'react';

import { useAuthRedux, useDBRedux, useNewsAPIRedux } from 'reduxStore/hooks';
import { usePaginationContext } from 'contexts';

import { useActiveLinks, useChooseRenderingNews } from 'hooks';

import { NewsList } from 'components';

import { usePagination } from './hooks';
import { PageTemplate } from '../template';
import { Pagination } from './subcomponents';

const TODAY_HOT_NEWS = 1;

const HomePage: FC = () => {
  const { fetchPopular } = useNewsAPIRedux();
  const { getSavedNews } = useDBRedux();
  const { isAuthenticated } = useAuthRedux();

  const { currentPage } = usePaginationContext();

  const activeLinks = useActiveLinks();
  const { rebuildedNews } = useChooseRenderingNews(activeLinks);
  const { currentItems, pageNumbers } = usePagination(rebuildedNews ?? []);

  useEffect(() => {
    fetchPopular({ period: TODAY_HOT_NEWS });
    if (isAuthenticated) getSavedNews();
  }, [fetchPopular, getSavedNews, isAuthenticated]);

  return (
    <PageTemplate>
      <NewsList currentItems={currentItems} currentPage={currentPage} />
      <Pagination pageNumbers={pageNumbers} />
    </PageTemplate>
  );
};

export default HomePage;
