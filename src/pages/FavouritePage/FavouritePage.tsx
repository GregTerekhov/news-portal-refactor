import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuthRedux, useDB, useFiltersAction } from 'reduxStore/hooks';

import { useActiveLinks, useChooseRenderingNews } from 'hooks';

import { NewsList } from 'components';
import { Loader, Notification, PlugImage } from 'ui';

const FavouritePage: FC<{}> = () => {
  const [openToast, setOpenToast] = useState<boolean>(false);
  const { isAuthenticated } = useAuthRedux();
  const { allFavourites, isLoadingDBData, errorDB, getFavourites, getSavedNews } = useDB();
  const { hasResults } = useFiltersAction();

  const location = useLocation();
  const activeLinks = useActiveLinks(location);
  const { rebuildedNews } = useChooseRenderingNews({ activeLinks });

  const navigate = useNavigate();

  useEffect(() => {
    if (errorDB && errorDB >= 500) {
      navigate('/serverError');
    }
  }, [errorDB]);

  useEffect(() => {
    getFavourites();
    getSavedNews();
  }, [getFavourites, getSavedNews]);

  useEffect(() => {
    if (!!allFavourites && allFavourites.length > 0) {
      setOpenToast(true);
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
