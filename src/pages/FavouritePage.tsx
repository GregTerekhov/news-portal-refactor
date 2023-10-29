import { Loader, NewsList, PlugImage } from 'components';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchFavourites, selectAllFavourites, selectLoading } from 'redux/newsDatabase';

const FavouritePage = () => {
  const dispatch = useAppDispatch();
  const favourites = useAppSelector(selectAllFavourites);
  const isLoading = useAppSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchFavourites());
  }, [dispatch]);

  const shouldShowLoader = isLoading;
  const shouldShowContent = !isLoading && favourites.length !== 0;

  return (
    <>
      {shouldShowLoader && <Loader />}
      {shouldShowContent && <NewsList currentItems={favourites} />}
      {!shouldShowLoader && !shouldShowContent && <PlugImage variant='page' />}
    </>
  );
};

export default FavouritePage;
