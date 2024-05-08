import { useEffect, useState } from 'react';

import type { SavedNewsOptions, VotedItem } from 'types';
import { useAuthRedux, useDBRedux } from 'reduxStore/hooks';
import { useActiveLinks } from 'hooks';

import useNewsActions from './useNewsActions';

interface NewsItemProps {
  liveNews: Partial<VotedItem>;
}

const useNews = ({ liveNews }: NewsItemProps) => {
  const { savedNews, allArchive } = useDBRedux();
  const { isArchiveActive } = useActiveLinks();

  const { savedFavourite, savedRead } = getNewsState();

  const [isFavourite, setIsFavourite] = useState<boolean>(savedFavourite ?? false);
  const [hasRead, setHasRead] = useState<boolean>(savedRead ?? false);

  const { isAuthenticated } = useAuthRedux();

  useEffect(() => {
    if (isAuthenticated && getNewsState()) {
      setIsFavourite(savedFavourite ?? false);
      setHasRead(savedRead ?? false);
    }
  }, [getNewsState, isAuthenticated, liveNews]);

  const { handleChangeFavourites, handleReadNews, handleDeleteNews } = useNewsActions({
    liveNews,
    isFavourite,
    setIsFavourite,
    setHasRead,
    getNewsState,
  });

  function getNewsState(): SavedNewsOptions {
    const newsArray = isArchiveActive ? allArchive : savedNews;
    const allSavedNews = newsArray?.find((news) => news.newsUrl === liveNews?.newsUrl);

    return {
      savedFavourite: allSavedNews?.isFavourite,
      savedRead: allSavedNews?.hasRead,
      savedAdditionDate: allSavedNews?.additionDate,
    };
  }

  return {
    isFavourite,
    hasRead,
    handleChangeFavourites,
    handleReadNews,
    handleDeleteNews,
  };
};

export default useNews;
