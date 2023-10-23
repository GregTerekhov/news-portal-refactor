import { Loader, NewsList, PlugImage } from 'components';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchFavourites, selectAllFavourites, selectLoading } from 'redux/newsDatabase';

const FavouritePage = () => {
  const dispatch = useAppDispatch();
  const favourites = useAppSelector(selectAllFavourites);
  const isLoading = useAppSelector(selectLoading);

  console.log(favourites);

  useEffect(() => {
    dispatch(fetchFavourites());
  }, []);

  return (
    <>
      {isLoading && favourites && favourites.length === 0 ? (
        <Loader />
      ) : !isLoading && favourites && favourites.length === 0 ? (
        <PlugImage variant='page' />
      ) : (
        <NewsList currentItems={favourites} />
      )}
    </>
  );
};

export default FavouritePage;
