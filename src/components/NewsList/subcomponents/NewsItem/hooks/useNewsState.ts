import { useEffect, useState } from 'react';

import { useAuthRedux, useDB } from 'reduxStore/hooks';
import type { VotedItem } from 'types';

import { useActiveLinks } from 'hooks';

type NewsStateHookProps = {
  liveNews: Partial<VotedItem>;
};

const useNewsState = ({ liveNews }: NewsStateHookProps) => {
  const { savedNews, allArchive } = useDB();
  const { isAuthenticated } = useAuthRedux();
  const { isArchiveActive } = useActiveLinks();

  const newsArray = isArchiveActive ? allArchive : savedNews;
  const allSavedNews = newsArray?.find((news) => news.newsUrl === liveNews?.newsUrl);

  const [newsState, setNewsState] = useState({
    isFavourite: allSavedNews?.isFavourite ?? false,
    hasRead: allSavedNews?.hasRead ?? false,
  });

  useEffect(() => {
    if (isAuthenticated && allSavedNews) {
      setNewsState({
        isFavourite: allSavedNews.isFavourite ?? false,
        hasRead: allSavedNews.hasRead ?? false,
      });
    }
  }, [allSavedNews, isAuthenticated, liveNews]);

  return {
    ...newsState,
    setIsFavourite: (isFavourite: boolean) => setNewsState({ ...newsState, isFavourite }),
    setHasRead: (hasRead: boolean) => setNewsState({ ...newsState, hasRead }),
  };
};

export default useNewsState;
