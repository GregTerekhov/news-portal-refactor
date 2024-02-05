import { VotedItem } from 'types';

import { useAuthRedux, useDB } from 'reduxStore/hooks';

import useNewsState from './useNewsState';
import useNewsActions from './useNewsActions';

interface NewsItemProps {
  liveNews: Partial<VotedItem>;
  isArchiveActive: boolean;
}

const useNews = ({ liveNews, isArchiveActive }: NewsItemProps) => {
  const { savedNews, allArchive } = useDB();
  const { isAuthenticated } = useAuthRedux();

  const { isFavourite, hasRead, setIsFavourite, setHasRead } = useNewsState({
    isArchiveActive,
    isAuthenticated,
    liveNews,
    savedNews,
    allArchive,
  });

  const { isDeleted, handleChangeFavourites, handleReadNews, handleDeleteNews } = useNewsActions({
    isArchiveActive,
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
