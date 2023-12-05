import React, { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import {
  useActiveLinks,
  useAuthCollector,
  useChooseRenderingNews,
  useNewsDBCollector,
} from 'hooks';

import { Loader, NewsList, PlugImage } from 'components';

const FavouritePage: FC<{}> = () => {
  // const { isAuthenticated } = useAuthCollector();
  const { allFavourites, isLoadingDBData, getFavourites, getSavedNews } = useNewsDBCollector();

  const location = useLocation();
  const activeLinks = useActiveLinks(location);
  const { rebuildedNews } = useChooseRenderingNews({ activeLinks });
  const isAuthenticated = true;
  useEffect(() => {
    getFavourites();
    getSavedNews();
  }, [getFavourites, getSavedNews]);

  const shouldShowLoader = isLoadingDBData;
  const shouldShowContent = !isLoadingDBData && allFavourites.length !== 0;

  return (
    isAuthenticated && (
      <>
        {shouldShowLoader && <Loader variant='generalSection' />}
        {shouldShowContent && <NewsList currentItems={rebuildedNews} />}
        {!shouldShowLoader && !shouldShowContent && <PlugImage variant='page' />}
      </>
    )
  );
};

export default FavouritePage;
