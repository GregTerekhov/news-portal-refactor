import { rebuildNewsArray } from 'helpers';
import { selectFilters } from 'redux/filterSlice';
import { useAppSelector } from 'redux/hooks';
import {
  selectByCategory,
  selectByDate,
  selectPopular,
  selectSearchByKeyword,
} from 'redux/newsAPI';
import { selectAllFavourites, selectAllReads } from 'redux/newsDatabase';

type RenderHookProps = {
  activeLinks: {
    isHomeActive: boolean;
    isFavoriteActive: boolean;
    isReadActive: boolean;
  };
};

const useChooseRenderingNews = ({ activeLinks }: RenderHookProps) => {
  const popularData = useAppSelector(selectPopular);
  const searchResults = useAppSelector(selectSearchByKeyword);
  const searchByCategory = useAppSelector(selectByCategory);
  const searchByDate = useAppSelector(selectByDate);
  const favourites = useAppSelector(selectAllFavourites);
  const reads = useAppSelector(selectAllReads);
  const filteredNews = useAppSelector(selectFilters);

  // console.log('popularData', popularData);
  // console.log('searchByCategory', searchByCategory);
  // console.log('searchResults', searchResults);
  // console.log('searchByDate', searchByDate);

  const chooseRenderingNews = () => {
    if (filteredNews && filteredNews?.length > 0 && activeLinks?.isHomeActive) {
      return filteredNews;
    } else if (searchResults && searchResults?.length > 0 && activeLinks?.isHomeActive) {
      const searchByWordNews = rebuildNewsArray(searchResults);

      return searchByWordNews || [];
    } else if (searchByCategory && searchByCategory?.length > 0 && activeLinks?.isHomeActive) {
      const searchByCategoryNews = rebuildNewsArray(searchByCategory);

      return searchByCategoryNews || [];
    } else if (searchByDate && searchByDate?.length > 0 && activeLinks?.isHomeActive) {
      const searchByDateNews = rebuildNewsArray(searchByDate);

      return searchByDateNews || [];
    } else if (popularData && popularData?.length > 0 && activeLinks?.isHomeActive) {
      const popularNews = rebuildNewsArray(popularData);

      return popularNews || [];
    } else if (favourites && favourites?.length > 0 && activeLinks?.isFavoriteActive) {
      return favourites;
    } else if (reads && reads?.length > 0 && activeLinks?.isReadActive) {
      return reads;
    }
  };

  const rebuildedNews = chooseRenderingNews();

  return { rebuildedNews };
};

export default useChooseRenderingNews;
