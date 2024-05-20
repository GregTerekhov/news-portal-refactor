import React, { FC, useEffect } from 'react';

import { TimePeriodRequest } from 'types';

import { useAuthRedux, useDBRedux, useNewsAPIRedux } from 'reduxStore/hooks';
import { usePaginationContext } from 'contexts';
import { PageTemplate } from '../template';

import { NewsList } from 'components';
import { Pagination } from './subcomponents';

import { useChooseRenderingNews } from 'hooks';
import { usePagination } from './hooks';

const HomePage: FC = () => {
  const { fetchPopular } = useNewsAPIRedux();
  const { getSavedNews } = useDBRedux();
  const { isAuthenticated } = useAuthRedux();

  const { currentPage } = usePaginationContext();

  const { rebuiltNews } = useChooseRenderingNews();
  const { currentItems, pageNumbers } = usePagination(rebuiltNews ?? []);

  useEffect(() => {
    fetchPopular({ period: TimePeriodRequest.Today });
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
