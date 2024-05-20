import React, { FC, useEffect } from 'react';

import { useDBRedux } from 'reduxStore/hooks';
import { PageTemplate } from '../template';

import { NewsList } from 'components';
import { ScrollSentinel } from './subcomponents';

import { useInfiniteScroll } from './hooks';

const FavouritePage: FC = () => {
  const { getFavourites, getSavedNews } = useDBRedux();
  const { displayedNews, handleLoadMore } = useInfiniteScroll();

  useEffect(() => {
    getFavourites();
    getSavedNews();
  }, [getFavourites, getSavedNews]);

  return (
    <PageTemplate>
      <NewsList currentItems={displayedNews} />
      <ScrollSentinel onLoadMore={handleLoadMore} />
    </PageTemplate>
  );
};

export default FavouritePage;
