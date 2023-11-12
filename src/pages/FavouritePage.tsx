import { Loader, NewsList, PlugImage } from 'components';
import { useNewsDBCollector } from 'hooks';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { addNews } from 'redux/newsDatabase';
// import { saveUnsavedChanges } from 'redux/newsDatabase/newsDataBaseSlice';

const FavouritePage = () => {
  const [changesHappened, setChangesHappened] = useState<boolean>(false);
  // const [deletedNewsIndex, setDeletedNewsIndex] = useState<number | null>(null);

  const dispatch = useAppDispatch();
  const { allFavourites, savedNews, isLoadingDBData, getFavourites, getSavedNews } =
    useNewsDBCollector();

  useEffect(() => {
    getFavourites();
    getSavedNews();
  }, []);

  // const handleDeleteNews = (index: number) => {
  //   setDeletedNewsIndex(index);
  // };

  useLayoutEffect(() => {
    if (changesHappened && savedNews) {
      // const updatedSavedNews = [...savedNews];
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

  const shouldShowLoader = isLoadingDBData;
  const shouldShowContent = !isLoadingDBData && allFavourites.length !== 0;

  return (
    <>
      {shouldShowLoader && <Loader variant='page' />}
      {shouldShowContent && (
        <NewsList
          currentItems={allFavourites}
          onChange={handleChangeVotes}
          // onDeleteNews={handleDeleteNews}
        />
      )}
      {!shouldShowLoader && !shouldShowContent && <PlugImage variant='page' />}
    </>
  );
};

export default FavouritePage;
