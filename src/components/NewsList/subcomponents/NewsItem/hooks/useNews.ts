import { VotedItem } from 'types';

import { useAuthRedux, useDB } from 'reduxStore/hooks';

import type { ActiveLinks } from 'hooks';

import useNewsState from './useNewsState';
import useNewsActions from './useNewsActions';

interface NewsItemProps {
  liveNews: Partial<VotedItem>;
  activeLinks: ActiveLinks;
}

const useNews = ({ liveNews, activeLinks }: NewsItemProps) => {
  const { savedNews, allArchive } = useDB();
  const { isAuthenticated } = useAuthRedux();

  const { isFavourite, hasRead, setIsFavourite, setHasRead } = useNewsState({
    activeLinks,
    isAuthenticated,
    liveNews,
    savedNews,
    allArchive,
  });

  const { isDeleted, handleChangeFavourites, handleReadNews, handleDeleteNews } = useNewsActions({
    activeLinks,
    isAuthenticated,
    liveNews,
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
