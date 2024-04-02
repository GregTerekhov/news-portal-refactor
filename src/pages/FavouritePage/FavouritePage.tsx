import React, { FC, useEffect } from 'react';

import { useDBRedux } from 'reduxStore/hooks';
import { PageTemplate } from '../template';

import { NewsList } from 'components';
import { InfiniteScroll } from './subcomponents';

import { useInfiniteScroll } from './hooks';

const FavouritePage: FC<{}> = () => {
  const { getFavourites, getSavedNews } = useDBRedux();
  const { displayedNews, handleLoadMore } = useInfiniteScroll();

  useEffect(() => {
    getFavourites();
    getSavedNews();
  }, [getFavourites, getSavedNews]);

  return (
    <PageTemplate>
      <NewsList currentItems={displayedNews} />
      <InfiniteScroll onLoadMore={handleLoadMore} />
    </PageTemplate>
  );
};

export default FavouritePage;
