import React, { FC, useEffect } from 'react';

import { useDBRedux } from 'reduxStore/hooks';
import { PageTemplate } from '../template';

import { useActiveLinks, useChooseRenderingNews } from 'hooks';

import { NewsList } from 'components';

const FavouritePage: FC<{}> = () => {
  const { getFavourites, getSavedNews } = useDBRedux();

  const activeLinks = useActiveLinks();
  const { rebuildedNews } = useChooseRenderingNews(activeLinks);

  useEffect(() => {
    getFavourites();
    getSavedNews();
  }, [getFavourites, getSavedNews]);

  return (
    <PageTemplate>
      <NewsList currentItems={rebuildedNews} />
    </PageTemplate>
  );
};

export default FavouritePage;
