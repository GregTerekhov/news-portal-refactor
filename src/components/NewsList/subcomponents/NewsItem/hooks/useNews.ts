import type { VotedItem } from 'types';

import useNewsState from './useNewsState';
import useNewsActions from './useNewsActions';

interface NewsItemProps {
  liveNews: Partial<VotedItem>;
}

const useNews = ({ liveNews }: NewsItemProps) => {
  const { isFavourite, hasRead, setIsFavourite, setHasRead } = useNewsState({
    liveNews,
  });

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
