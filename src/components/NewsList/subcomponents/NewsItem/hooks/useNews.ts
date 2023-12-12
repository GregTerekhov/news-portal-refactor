import { VotedItem } from 'types';
import { useAuthCollector, useNewsDBCollector } from 'hooks';
import { ActiveLinks } from 'hooks/useActiveLinks';

import useNewsState from './useNewsState';
import useNewsActions from './useNewsActions';

interface NewsItemProps {
  liveNews: Partial<VotedItem>;
  activeLinks: ActiveLinks;
}

const useNews = ({ liveNews, activeLinks }: NewsItemProps) => {
  const { savedNews, allArchive } = useNewsDBCollector();
  const { isAuthenticated } = useAuthCollector();

  const { isFavourite, hasRead, setIsFavourite, setHasRead } = useNewsState({
    activeLinks,
    isAuthenticated,
    liveNews,
    savedNews,
    allArchive,
  });

  const { handleChangeFavourites, handleReadNews, handleDeleteNews } = useNewsActions({
    activeLinks,
    isAuthenticated,
    liveNews,
    setIsFavourite,
    setHasRead,
  });

  return {
    isFavourite,
    hasRead,
    handleChangeFavourites,
    handleReadNews,
    handleDeleteNews,
  };
};

export default useNews;
