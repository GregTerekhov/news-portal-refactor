import { useEffect, useState } from 'react';

import type { VotedItem } from 'types';
import { useAuthRedux, useDBRedux } from 'reduxStore/hooks';
import { useActiveLinks } from 'hooks';

import useNewsActions from './useNewsActions';

interface NewsItemProps {
  liveNews: Partial<VotedItem>;
}

const useNews = ({ liveNews }: NewsItemProps) => {
  const { savedNews, allArchive } = useDBRedux();
  const { isAuthenticated } = useAuthRedux();
  const { isArchiveActive } = useActiveLinks();

  const newsArray = isArchiveActive ? allArchive : savedNews;
  const allSavedNews = newsArray?.find((news) => news.newsUrl === liveNews?.newsUrl);

  const [isFavourite, setIsFavourite] = useState<boolean>(allSavedNews?.isFavourite ?? false);
  const [hasRead, setHasRead] = useState<boolean>(allSavedNews?.hasRead ?? false);

  useEffect(() => {
    if (isAuthenticated && allSavedNews) {
      setIsFavourite(allSavedNews?.isFavourite ?? false);
      setHasRead(allSavedNews?.hasRead ?? false);
    }
  }, [allSavedNews, isAuthenticated, liveNews]);

  const { isDeleted, handleChangeFavourites, handleReadNews, handleDeleteNews } = useNewsActions({
    liveNews,
    isFavourite,
    setIsFavourite,
    setHasRead,
  });

  return {
    isFavourite,
    hasRead,
    isDeleted,
    handleChangeFavourites,
    handleReadNews,
    handleDeleteNews,
  };
};

export default useNews;
