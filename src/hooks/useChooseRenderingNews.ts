import { rebuildNewsArray } from 'helpers';

import { useDB, useNewsAPI, useFiltersAction } from 'reduxStore/hooks';

import { ActiveLinks } from './useActiveLinks';

type RenderHookProps = {
  activeLinks: ActiveLinks;
};

const useChooseRenderingNews = ({ activeLinks }: RenderHookProps) => {
  const { popularNews, newsByKeyword, newsByCategory, newsByDate } = useNewsAPI();
  const { allFavourites, allReads, allArchive } = useDB();
  const { filteredNews } = useFiltersAction();

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
