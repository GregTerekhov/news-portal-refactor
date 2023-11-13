import { useEffect, useState } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { fetchNewsByCategory, fetchNewsByKeyword, fetchPopularNews } from 'redux/newsAPI';
import { useNewsAPICollector } from '.';

const useAdditionalRequest = () => {
  const [query, setQuery] = useState<string>('');
  const dispatch = useAppDispatch();
  const {
    popularNews,
    newsByKeyword,
    newsByCategory,
    newsByDate,
    categoriesList,
    fetchCategoriesList,
    resetPreviousRequest,
  } = useNewsAPICollector();

  const showPopular =
    (newsByKeyword && newsByKeyword?.length === 0) ||
    (newsByCategory && newsByCategory?.length === 0) ||
    (newsByDate && newsByDate?.length === 0);

  useEffect(() => {
    fetchCategoriesList();
  }, []);

  const getCategoriesList = () => {
    if (categoriesList) {
      const selectedArray = categoriesList.map((item) => item.display_name);

      return selectedArray;
    }
    return [];
  };

  const categoriesForDropdown = getCategoriesList();

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value.toLowerCase());
  };

  const onHandleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (query) {
      resetPreviousRequest();
      dispatch(fetchNewsByKeyword(query));
      setQuery('');
    }
  };

  const getNewsByCategory = async (section: string) => {
    if (section) {
      resetPreviousRequest();
      await dispatch(fetchNewsByCategory(section));
    }
  };

  const getNewsByPeriod = async (period: string) => {
    resetPreviousRequest();
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
      (newsByKeyword && newsByKeyword?.length > 0) ||
      (newsByCategory && newsByCategory?.length > 0) ||
      (newsByDate && newsByDate?.length > 0)
    ) {
      resetPreviousRequest();
      await dispatch(fetchPopularNews('1'));
    }
  };

  return {
    query,
    categoriesForDropdown,
    showPopular,
    onChangeInput,
    onHandleSearch,
    getNewsByCategory,
    getNewsByPeriod,
    handleResetRequests,
  };
};

export default useAdditionalRequest;
