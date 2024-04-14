import { useEffect, useState } from 'react';

import type { VotedItem } from 'types';
import { useAuthRedux, useDBRedux } from 'reduxStore/hooks';

import { useActiveLinks } from 'hooks';

type NewsStateHookProps = {
  liveNews: Partial<VotedItem>;
};

const useNewsState = ({ liveNews }: NewsStateHookProps) => {
  const { savedNews, allArchive } = useDBRedux();
  const { isAuthenticated } = useAuthRedux();
  const { isArchiveActive } = useActiveLinks();

  const newsArray = isArchiveActive ? allArchive : savedNews;
  const allSavedNews = newsArray?.find((news) => news.newsUrl === liveNews?.newsUrl);

  // const [newsState, setNewsState] = useState({
  //   isFavourite: allSavedNews?.isFavourite ?? false,
  //   hasRead: allSavedNews?.hasRead ?? false,
  // });

  const [isFavourite, setIsFavourite] = useState<boolean>(allSavedNews?.isFavourite ?? false);
  const [hasRead, setHasRead] = useState<boolean>(allSavedNews?.hasRead ?? false);

  useEffect(() => {
    if (isAuthenticated && allSavedNews) {
      // setNewsState({
      setIsFavourite(allSavedNews.isFavourite ?? false);
      setHasRead(allSavedNews.hasRead ?? false);
      // });
    }
  }, [allSavedNews, isAuthenticated, liveNews]);

  return {
    isFavourite,
    hasRead,
    setIsFavourite,
    setHasRead,
    // ...newsState,
    // setIsFavourite: (isFavourite: boolean) => setNewsState({ ...newsState, isFavourite }),
    // setHasRead: (hasRead: boolean) => setNewsState({ ...newsState, hasRead }),
  };
};

export default useNewsState;
