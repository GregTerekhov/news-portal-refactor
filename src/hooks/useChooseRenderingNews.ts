import { useDB, useNewsAPI, useFiltersAction } from 'reduxStore/hooks';

import { rebuildNewsArray } from 'helpers';

import type { ActiveLinks } from './commonTypes';

const useChooseRenderingNews = (activeLinks: ActiveLinks) => {
  const { popularNews, newsByKeyword, newsByCategory, newsByDate } = useNewsAPI();
  const { allFavourites, allReads, allArchive } = useDB();
  const { filteredNews } = useFiltersAction();

  const { isHomeActive, isFavoriteActive, isReadActive, isArchiveActive } = activeLinks;

  const chooseRenderingNews = () => {
    switch (true) {
      case !!filteredNews?.length:
        return filteredNews;
      case !!newsByKeyword?.length && isHomeActive:
        return rebuildNewsArray(newsByKeyword) || [];
      case !!newsByCategory?.length && isHomeActive:
        return rebuildNewsArray(newsByCategory) || [];
      case !!newsByDate?.length && isHomeActive:
        return rebuildNewsArray(newsByDate) || [];
      case !!popularNews?.length && isHomeActive:
        return rebuildNewsArray(popularNews) || [];
      case !!allFavourites?.length && isFavoriteActive:
        return allFavourites || [];
      case !!allReads?.length && isReadActive:
        return allReads || [];
      case !!allArchive?.length && isArchiveActive:
        return allArchive || [];

      default:
        return [];
    }
  };

  const rebuildedNews = chooseRenderingNews();

  return { rebuildedNews };
};

export default useChooseRenderingNews;
