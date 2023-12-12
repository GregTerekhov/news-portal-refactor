import { useEffect, useState } from 'react';

import { PartialVotedNewsArray, VotedItem } from 'types';

import { ActiveLinks } from 'hooks/useActiveLinks';

type NewsStateHookProps = {
  activeLinks: ActiveLinks;
  isAuthenticated: boolean;
  liveNews: Partial<VotedItem>;
  savedNews: PartialVotedNewsArray;
  allArchive: PartialVotedNewsArray;
};

const useNewsState = ({
  activeLinks,
  isAuthenticated,
  liveNews,
  savedNews,
  allArchive,
}: NewsStateHookProps) => {
  const [isFavourite, setIsFavourite] = useState<boolean>(() => getIsFavourite());
  const [hasRead, setHasRead] = useState<boolean>(() => getHasRead());

  useEffect(() => {
    if (isAuthenticated) {
      if (!activeLinks.isArchiveActive) {
        if (savedNews && liveNews?.newsUrl !== undefined) {
          if (savedNews?.length !== 0) {
            const existingNews = savedNews?.find((news) => news.newsUrl === liveNews?.newsUrl);
            const savedFavourite = existingNews?.isFavourite;
            const savedRead = existingNews?.hasRead;

            if (savedFavourite && savedRead) {
              setIsFavourite(true);
              setHasRead(true);
            }
            if (savedFavourite && !savedRead) {
              setIsFavourite(true);
            }
            if (savedRead && !savedFavourite) {
              setHasRead(true);
            }
          } else {
            return;
          }
        }
      } else if (activeLinks.isArchiveActive && allArchive && allArchive.length !== 0) {
        const existingFavourite = allArchive.find(
          (news) => news.isFavourite === liveNews.isFavourite,
        );
        const existingRead = allArchive.find((news) => news.hasRead === liveNews.hasRead);
        const savedFavourite = existingFavourite?.isFavourite;
        const savedRead = existingRead?.hasRead;

        if (savedFavourite && savedRead) {
          setIsFavourite(true);
          setHasRead(true);
        }
        if (savedFavourite && !savedRead) {
          setIsFavourite(true);
          setHasRead(false);
        }
        if (savedRead && !savedFavourite) {
          setHasRead(true);
          setIsFavourite(false);
        }
      }
    }
  }, [savedNews, allArchive, isAuthenticated, liveNews]);

  function getIsFavourite(): boolean {
    if (!activeLinks.isArchiveActive) {
      const existingNews = savedNews?.find((news) => news.newsUrl === liveNews?.newsUrl);
      return existingNews?.isFavourite ?? false;
    } else {
      const existingNews = allArchive?.find((news) => news.newsUrl === liveNews?.newsUrl);
      return existingNews?.isFavourite ?? false;
    }
  }

  function getHasRead(): boolean {
    if (!activeLinks.isArchiveActive) {
      const existingNews = savedNews?.find((news) => news.newsUrl === liveNews?.newsUrl);
      return existingNews?.hasRead ?? false;
    } else {
      const existingNews = allArchive?.find((news) => news.newsUrl === liveNews?.newsUrl);
      return existingNews?.hasRead ?? false;
    }
  }

  return { isFavourite, hasRead, setIsFavourite, setHasRead };
};

export default useNewsState;
