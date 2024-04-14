import type { ActiveLinks } from './commonTypes';
import { useDBRedux, useNewsAPIRedux, useFiltersRedux } from 'reduxStore/hooks';

import { rebuildingNewsArray } from 'helpers';

const useChooseRenderingNews = (activeLinks: ActiveLinks) => {
  const { popularNews, newsByKeyword, newsByCategory, newsByDate } = useNewsAPIRedux();
  const { allFavourites, allReads, allArchive } = useDBRedux();
  const { filteredNews } = useFiltersRedux();

  const { isHomeActive, isFavoriteActive, isReadActive, isArchiveActive } = activeLinks;

  const chooseRenderingNews = () => {
    switch (true) {
      case !!filteredNews?.length:
        return filteredNews;
      case !!newsByKeyword?.length && isHomeActive:
        return rebuildingNewsArray(newsByKeyword) || [];
      case !!newsByCategory?.length && isHomeActive:
        return rebuildingNewsArray(newsByCategory) || [];
      case !!newsByDate?.length && isHomeActive:
        return rebuildingNewsArray(newsByDate) || [];
      case !!popularNews?.length && isHomeActive:
        return rebuildingNewsArray(popularNews) || [];
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

  const rebuiltNews = chooseRenderingNews();

  return { rebuiltNews };
};

export default useChooseRenderingNews;
