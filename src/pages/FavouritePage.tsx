import { Loader, NewsList, PlugImage } from 'components';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  addNews,
  fetchFavourites,
  selectAllFavourites,
  selectSavedNews,
  selectLoading,
} from 'redux/newsDatabase';
// import { saveUnsavedChanges } from 'redux/newsDatabase/newsDataBaseSlice';

const FavouritePage = () => {
  const [changesHappened, setChangesHappened] = useState<boolean>(false);
  // const [deletedNewsIndex, setDeletedNewsIndex] = useState<number | null>(null);

  const dispatch = useAppDispatch();
  const favourites = useAppSelector(selectAllFavourites);
  const isLoading = useAppSelector(selectLoading);
  const savedNews = useAppSelector(selectSavedNews);

  useEffect(() => {
    dispatch(fetchFavourites());
  }, [dispatch]);

  // const handleDeleteNews = (index: number) => {
  //   console.log('index', index);
  //   setDeletedNewsIndex(index);
  // };
  // if (favourites) {
  //   console.log('favourites', favourites);
  // }

  useLayoutEffect(() => {
    if (changesHappened && savedNews) {
      console.log('Клік по фаворитах, або по посиланню відбувся');
      // const updatedSavedNews = [...savedNews];
      // console.log('updatedSavedNews', updatedSavedNews);
      // updatedSavedNews.splice(deletedNewsIndex, 1);
      dispatch(addNews(savedNews));
      // dispatch(saveUnsavedChanges());
      setChangesHappened(false);
      // setDeletedNewsIndex(null);
    }
  }, [changesHappened]);

  const handleChangeVotes = () => {
    setChangesHappened(true);
  };

  const shouldShowLoader = isLoading;
  const shouldShowContent = !isLoading && favourites.length !== 0;

  return (
    <>
      {shouldShowLoader && <Loader />}
      {shouldShowContent && (
        <NewsList
          currentItems={favourites}
          onChange={handleChangeVotes}
          // onDeleteNews={handleDeleteNews}
        />
      )}
      {!shouldShowLoader && !shouldShowContent && <PlugImage variant='page' />}
    </>
  );
};

export default FavouritePage;
