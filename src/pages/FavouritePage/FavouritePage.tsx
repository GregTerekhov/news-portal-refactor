import React, { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import {
  useActiveLinks,
  useAuthCollector,
  useChooseRenderingNews,
  useFilterCollector,
  useNewsDBCollector,
} from 'hooks';

import { NewsList } from 'components';
import { Loader, Notification, PlugImage } from 'ui';

const FavouritePage: FC<{}> = () => {
  const [openToast, setOpenToast] = useState<boolean>(false);
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

  useEffect(() => {
    if (!!allFavourites) {
      setOpenToast(true);
      console.log('openToast', openToast);
    }
  }, [allFavourites]);

  const shouldShowLoader = isLoadingDBData || hasResults === 'loading';
  const shouldShowPlug = allFavourites.length === 0 || hasResults === 'empty';
  const shouldShowContent = !shouldShowPlug && !shouldShowLoader;

  return (
    isAuthenticated && (
      <>
        {shouldShowLoader && <Loader variant='generalSection' />}
        {!shouldShowLoader && allFavourites && (
          <Notification
            variant='non-interactive'
            openToast={openToast}
            setOpenToast={setOpenToast}
            title='Monthly statistics'
            description={`${allFavourites.length} news added to Favourites`}
          />
        )}
        {shouldShowContent && <NewsList currentItems={rebuildedNews} />}
        {!shouldShowLoader && shouldShowPlug && <PlugImage variant='page' />}
      </>
    )
  );
};

export default FavouritePage;
