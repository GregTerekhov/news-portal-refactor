import React, { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import {
  useActiveLinks,
  useAuthCollector,
  useChooseRenderingNews,
  useFilterCollector,
  useNewsDBCollector,
} from 'hooks';

import { Loader, NewsList, PlugImage } from 'components';

const FavouritePage: FC<{}> = () => {
  const { isAuthenticated } = useAuthCollector();
  const { allFavourites, isLoadingDBData, getFavourites, getSavedNews } = useNewsDBCollector();
  const { hasResults } = useFilterCollector();
  const location = useLocation();
  const activeLinks = useActiveLinks(location);
  const { rebuildedNews } = useChooseRenderingNews({ activeLinks });
  // const isAuthenticated = true;
  useEffect(() => {
    getFavourites();
    getSavedNews();
  }, [getFavourites, getSavedNews]);

  const shouldShowLoader = isLoadingDBData || hasResults === 'loading';
  const shouldShowPlug = allFavourites.length === 0 || hasResults === 'empty';
  const shouldShowContent = !shouldShowPlug && !shouldShowLoader;

  return (
    isAuthenticated && (
      <>
        {shouldShowLoader && <Loader variant='generalSection' />}
        {shouldShowContent && <NewsList currentItems={rebuildedNews} />}
        {shouldShowPlug && <PlugImage variant='page' />}
      </>
    )
  );
};

export default FavouritePage;
