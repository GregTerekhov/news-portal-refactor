import { useEffect, useState } from 'react';

import { PartialVotedNewsArray, VotedItem } from 'types';

type NewsStateHookProps = {
  isArchiveActive: boolean;
  isAuthenticated: boolean;
  liveNews: Partial<VotedItem>;
  savedNews: PartialVotedNewsArray;
  allArchive: PartialVotedNewsArray;
};

const useNewsState = ({
  isArchiveActive,
  isAuthenticated,
  liveNews,
  savedNews,
  allArchive,
}: NewsStateHookProps) => {
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
