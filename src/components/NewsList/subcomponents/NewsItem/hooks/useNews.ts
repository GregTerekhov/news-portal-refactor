import { useEffect, useState } from 'react';

import type { VotedItem, VotedPartial } from 'types';
import { useAuthRedux, useDBRedux } from 'reduxStore/hooks';
import { useActiveLinks } from 'hooks';

import useNewsActions from './useNewsActions';

interface NewsItemProps {
  liveNews: Partial<VotedItem>;
}

const useNews = ({ liveNews }: NewsItemProps) => {
  const { savedNews, allArchive } = useDBRedux();
  const { isArchiveActive } = useActiveLinks();
  const [isFavourite, setIsFavourite] = useState<boolean>(getNewsState().isFavourite ?? false);
  const [hasRead, setHasRead] = useState<boolean>(getNewsState().hasRead ?? false);

  const { isAuthenticated } = useAuthRedux();

  useEffect(() => {
    if (isAuthenticated && getNewsState()) {
      setIsFavourite(getNewsState().isFavourite ?? false);
      setHasRead(getNewsState().hasRead ?? false);
    }
  }, [getNewsState, isAuthenticated, liveNews]);

  const { handleChangeFavourites, handleReadNews, handleDeleteNews } = useNewsActions({
    liveNews,
    isFavourite,
    setIsFavourite,
    setHasRead,
    getNewsState,
  });

  function getNewsState(): VotedPartial<VotedItem> {
    const newsArray = isArchiveActive ? allArchive : savedNews;
    const allSavedNews = newsArray?.find((news) => news.newsUrl === liveNews?.newsUrl);

    const isFavourite = allSavedNews?.isFavourite;
    const hasRead = allSavedNews?.hasRead;
    const additionDate = allSavedNews?.additionDate;

    return { isFavourite, hasRead, additionDate };
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
