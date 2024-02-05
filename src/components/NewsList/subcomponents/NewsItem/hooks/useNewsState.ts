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
  const [isFavourite, setIsFavourite] = useState<boolean>(() => getIsFavourite());
  const [hasRead, setHasRead] = useState<boolean>(() => getHasRead());

  useEffect(() => {
    if (isAuthenticated) {
      if (!isArchiveActive) {
        if (savedNews && liveNews?.newsUrl !== undefined) {
          if (savedNews?.length !== 0) {
            const existingNews = savedNews?.find((news) => news.newsUrl === liveNews?.newsUrl);
            updateStates(existingNews);
          }
        }
      } else if (isArchiveActive && allArchive && allArchive.length !== 0) {
        const existingNews = allArchive.find((news) => news.newsUrl === liveNews.newsUrl);
        updateStates(existingNews);
      }
    }
  }, [savedNews, allArchive, isAuthenticated, liveNews]);

  function updateStates(existingNews: Partial<VotedItem> | undefined) {
    const savedFavourite = existingNews?.isFavourite;
    const savedRead = existingNews?.hasRead;

    setIsFavourite(savedFavourite ?? false);
    setHasRead(savedRead ?? false);
  }

  function getIsFavourite(): boolean {
    const newsArray = isArchiveActive ? allArchive : savedNews;
    const existingNews = newsArray.find((news) => news.newsUrl === liveNews?.newsUrl);
    return existingNews?.isFavourite ?? false;
  }

  function getHasRead(): boolean {
    const newsArray = isArchiveActive ? allArchive : savedNews;
    const existingNews = newsArray.find((news) => news.newsUrl === liveNews?.newsUrl);
    return existingNews?.hasRead ?? false;
  }

  return { isFavourite, hasRead, setIsFavourite, setHasRead };
};

export default useNewsState;
