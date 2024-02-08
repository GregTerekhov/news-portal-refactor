import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthRedux, useDB, useFiltersAction } from 'reduxStore/hooks';

import { useActiveLinks, useChooseRenderingNews } from 'hooks';

import { NewsList, Toast } from 'components';
import { Loader, PlugImage } from 'ui';

const FavouritePage: FC<{}> = () => {
  const { isAuthenticated } = useAuthRedux();
  const { allFavourites, isLoadingDBData, errorDB, dbSuccessMessage, getFavourites, getSavedNews } =
    useDB();
  const { hasResults } = useFiltersAction();

  const activeLinks = useActiveLinks();
  const { rebuildedNews } = useChooseRenderingNews({ activeLinks });
  console.log('dbSuccessMessage', dbSuccessMessage);
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

  const shouldShowLoader = isLoadingDBData || hasResults === 'loading';
  const shouldShowPlug = allFavourites.length === 0 || hasResults === 'empty';
  const shouldShowContent = !shouldShowPlug && !shouldShowLoader;
  const shouldShowToast = !shouldShowLoader && allFavourites && allFavourites.length > 0;

  return (
    isAuthenticated && (
      <>
        {shouldShowLoader && <Loader variant='generalSection' />}
        {shouldShowToast && <Toast variant='non-interactive' status='info' />}
        {shouldShowContent && <NewsList currentItems={rebuildedNews} />}
        {!shouldShowLoader && shouldShowPlug && <PlugImage variant='page' />}
      </>
    )
  );
};

export default FavouritePage;
