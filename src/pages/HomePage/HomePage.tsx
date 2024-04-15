import React, { FC, useEffect } from 'react';

import { useAuthRedux, useDBRedux, useNewsAPIRedux } from 'reduxStore/hooks';
import { usePaginationContext } from 'contexts';
import { PageTemplate } from '../template';

import { useActiveLinks, useChooseRenderingNews } from 'hooks';

import { NewsList } from 'components';

import { usePagination } from './hooks';
import { Pagination } from './subcomponents';

const TODAY_HOT_NEWS = 1;

const HomePage: FC = () => {
  const { fetchPopular } = useNewsAPIRedux();
  const { getSavedNews } = useDBRedux();
  const { isAuthenticated } = useAuthRedux();

  const { currentPage } = usePaginationContext();

  const activeLinks = useActiveLinks();
  const { rebuiltNews } = useChooseRenderingNews(activeLinks);
  const { currentItems, pageNumbers } = usePagination(rebuiltNews ?? []);

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
