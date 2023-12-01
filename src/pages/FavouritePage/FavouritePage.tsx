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
  // const [changesHappened, setChangesHappened] = useState<boolean>(false);
  // const [deletedNewsIndex, setDeletedNewsIndex] = useState<number | null>(null);
  const { isAuthenticated } = useAuthCollector();
  const { allFavourites, isLoadingDBData, getFavourites, getSavedNews } = useNewsDBCollector();
  const location = useLocation();
  const activeLinks = useActiveLinks(location);
  const { rebuildedNews } = useChooseRenderingNews({ activeLinks });

  useEffect(() => {
    getFavourites();
    getSavedNews();
  }, [getFavourites, getSavedNews]);

  // const handleDeleteNews = (index: number) => {
  //   setDeletedNewsIndex(index);
  // };

  // useLayoutEffect(() => {
  //   if (changesHappened && savedNews) {
  //     addVotedNews(savedNews);
  //     setChangesHappened(false);
  //     // setDeletedNewsIndex(null);
  //   }
  // }, [changesHappened, addVotedNews]);

  // const handleChangeVotes = () => {
  //   setChangesHappened(true);
  // };

  const shouldShowLoader = isLoadingDBData;
  const shouldShowContent = !isLoadingDBData && allFavourites.length !== 0;

  return (
    isAuthenticated && (
      <>
        {shouldShowLoader && <Loader variant='generalSection' />}
        {shouldShowContent && (
          <NewsList
            currentItems={rebuildedNews}
            // onChange={handleChangeVotes}
            // onDeleteNews={handleDeleteNews}
          />
        )}
        {!shouldShowLoader && !shouldShowContent && <PlugImage variant='page' />}
      </>
    )
  );
};

export default FavouritePage;
