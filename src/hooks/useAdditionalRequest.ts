import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  fetchAllCategories,
  fetchNewsByCategory,
  fetchPopularNews,
  selectAllCategories,
  selectByCategory,
  selectByDate,
  selectPopular,
  selectSearchByKeyword,
} from 'redux/newsAPI';
import { resetOtherRequests } from 'redux/newsAPI/newsAPISlice';

const useAdditionalRequest = () => {
  const dispatch = useAppDispatch();
  const categoriesList = useAppSelector(selectAllCategories);
  const popularNews = useAppSelector(selectPopular);
  const searchResults = useAppSelector(selectSearchByKeyword);
  const searchByCategory = useAppSelector(selectByCategory);
  const searchByDate = useAppSelector(selectByDate);

  const showPopular =
    (searchResults && searchResults?.length === 0) ||
    (searchByCategory && searchByCategory?.length === 0) ||
    (searchByDate && searchByDate?.length === 0);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const getCategoriesList = () => {
    if (categoriesList) {
      const selectedArray = categoriesList.map((item) => item.display_name);

      return selectedArray;
    }
  };

  const categoriesForDropdown = getCategoriesList();

  const getNewsByCategory = async (section: string) => {
    if (section) {
      dispatch(resetOtherRequests());
      await dispatch(fetchNewsByCategory(section));
    }
  };

  const getNewsByPeriod = async (period: string) => {
    dispatch(resetOtherRequests());
    if (period === 'Today') {
      await dispatch(fetchPopularNews('1'));
    } else if (period === 'Week') {
      await dispatch(fetchPopularNews('7'));
    } else if (period === 'Month') {
      await dispatch(fetchPopularNews('30'));
    }
  };

  const handleResetRequests = async () => {
    if (
      (popularNews && popularNews?.length > 0) ||
      (searchResults && searchResults?.length > 0) ||
      (searchByCategory && searchByCategory?.length > 0) ||
      (searchByDate && searchByDate?.length > 0)
    ) {
      dispatch(resetOtherRequests());
      await dispatch(fetchPopularNews('1'));
    }
  };

  return {
    categoriesForDropdown,
    showPopular,
    getNewsByCategory,
    getNewsByPeriod,
    handleResetRequests,
  };
};

export default useAdditionalRequest;
