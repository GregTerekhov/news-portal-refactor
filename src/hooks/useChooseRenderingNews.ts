import { rebuildNewsArray } from 'helpers';

import useNewsAPICollector from './useNewsAPICollector';
import useNewsDBCollector from './useNewsDBCollector';
import useFilterCollector from './useFilterCollector';
import { ActiveLinks } from './useActiveLinks';

type RenderHookProps = {
  activeLinks: ActiveLinks;
};

const useChooseRenderingNews = ({ activeLinks }: RenderHookProps) => {
  const { popularNews, newsByKeyword, newsByCategory, newsByDate } = useNewsAPICollector();
  const { allFavourites, allReads, allArchive } = useNewsDBCollector();
  const { filteredNews } = useFilterCollector();

  const chooseRenderingNews = () => {
    if (filteredNews && filteredNews?.length > 0) {
      return filteredNews;
    } else if (newsByKeyword && newsByKeyword?.length > 0 && activeLinks?.isHomeActive) {
      const searchByWordNews = rebuildNewsArray(newsByKeyword);

      return searchByWordNews || [];
    } else if (newsByCategory && newsByCategory?.length > 0 && activeLinks?.isHomeActive) {
      const searchByCategoryNews = rebuildNewsArray(newsByCategory);

      return searchByCategoryNews || [];
    } else if (newsByDate && newsByDate?.length > 0 && activeLinks?.isHomeActive) {
      const searchByDateNews = rebuildNewsArray(newsByDate);

      return searchByDateNews || [];
    } else if (popularNews && popularNews?.length > 0 && activeLinks?.isHomeActive) {
      const popularNewsArray = rebuildNewsArray(popularNews);

      return popularNewsArray || [];
    } else if (allFavourites && allFavourites?.length > 0 && activeLinks?.isFavoriteActive) {
      return allFavourites || [];
    } else if (allReads && allReads?.length > 0 && activeLinks?.isReadActive) {
      return allReads || [];
    } else if (allArchive && allArchive?.length > 0 && activeLinks?.isArchiveActive) {
      return allArchive || [];
    }
    return [];
  };

  const rebuildedNews = chooseRenderingNews();

  return { rebuildedNews };
};

export default useChooseRenderingNews;
