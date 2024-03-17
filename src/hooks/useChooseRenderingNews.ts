import { useDB, useNewsAPI, useFiltersAction } from 'reduxStore/hooks';

import { rebuildNewsArray } from 'helpers';

import type { ActiveLinks } from './commonTypes';

const useChooseRenderingNews = (activeLinks: ActiveLinks) => {
  const { popularNews, newsByKeyword, newsByCategory, newsByDate } = useNewsAPI();
  const { allFavourites, allReads, allArchive } = useDB();
  const { filteredNews } = useFiltersAction();

  const { isHomeActive, isFavoriteActive, isReadActive, isArchiveActive } = activeLinks;

  const chooseRenderingNews = () => {
    if (filteredNews?.length > 0) {
      return filteredNews;
    } else if (newsByKeyword?.length > 0 && isHomeActive) {
      const searchByWordNews = rebuildNewsArray(newsByKeyword);

      return searchByWordNews || [];
    } else if (newsByCategory?.length > 0 && isHomeActive) {
      const searchByCategoryNews = rebuildNewsArray(newsByCategory);

      return searchByCategoryNews || [];
    } else if (newsByDate?.length > 0 && isHomeActive) {
      const searchByDateNews = rebuildNewsArray(newsByDate);

      return searchByDateNews || [];
    } else if (popularNews?.length > 0 && isHomeActive) {
      const popularNewsArray = rebuildNewsArray(popularNews);

      return popularNewsArray || [];
    } else if (allFavourites?.length > 0 && isFavoriteActive) {
      return allFavourites || [];
    } else if (allReads?.length > 0 && isReadActive) {
      return allReads || [];
    } else if (allArchive?.length > 0 && isArchiveActive) {
      return allArchive || [];
    }
    return [];
  };

  const rebuildedNews = chooseRenderingNews();

  return { rebuildedNews };
};

export default useChooseRenderingNews;
