import { useDBRedux, useNewsAPIRedux, useFiltersRedux } from 'reduxStore/hooks';

import { rebuildingNewsArray } from 'helpers';
import useActiveLinks from './useActiveLinks';

const useChooseRenderingNews = () => {
  const { popularNews, newsByKeyword, newsByCategory, newsByDate } = useNewsAPIRedux();
  const { allFavourites, allReads, allArchive } = useDBRedux();
  const { filteredNews } = useFiltersRedux();

  const { isHomeActive, isFavoriteActive, isReadActive, isArchiveActive } = useActiveLinks();

  const chooseRenderingNews = () => {
    switch (true) {
      case !!filteredNews?.length:
        return filteredNews;
      case !!newsByKeyword?.length && isHomeActive:
        return rebuildingNewsArray(newsByKeyword) ?? [];
      case !!newsByCategory?.length && isHomeActive:
        return rebuildingNewsArray(newsByCategory) ?? [];
      case !!newsByDate?.length && isHomeActive:
        return rebuildingNewsArray(newsByDate) ?? [];
      case !!popularNews?.length && isHomeActive:
        return rebuildingNewsArray(popularNews) ?? [];
      case !!allFavourites?.length && isFavoriteActive:
        return allFavourites ?? [];
      case !!allReads?.length && isReadActive:
        return allReads ?? [];
      case !!allArchive?.length && isArchiveActive:
        return allArchive ?? [];

      default:
        return [];
    }
  };

  return { rebuiltNews: chooseRenderingNews() };
};

export default useChooseRenderingNews;
