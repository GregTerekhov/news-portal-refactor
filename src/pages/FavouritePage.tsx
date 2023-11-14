import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { addNews } from 'reduxStore/newsDatabase';
import { useAppDispatch } from 'reduxStore/hooks';
// import { saveUnsavedChanges } from 'reduxStore/newsDatabase/newsDataBaseSlice';

import { useActiveLinks, useChooseRenderingNews, useNewsDBCollector } from 'hooks';

import { Loader, NewsList, PlugImage } from 'components';

const FavouritePage = () => {
  const [changesHappened, setChangesHappened] = useState<boolean>(false);
  // const [deletedNewsIndex, setDeletedNewsIndex] = useState<number | null>(null);

  const dispatch = useAppDispatch();
  const { allFavourites, savedNews, isLoadingDBData, getFavourites, getSavedNews } =
    useNewsDBCollector();
  const location = useLocation();
  const activeLinks = useActiveLinks(location);
  const { rebuildedNews } = useChooseRenderingNews({ activeLinks });

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
          currentItems={rebuildedNews}
          onChange={handleChangeVotes}
          // onDeleteNews={handleDeleteNews}
        />
      )}
      {!shouldShowLoader && !shouldShowContent && <PlugImage variant='page' />}
    </>
  );
};

export default FavouritePage;
