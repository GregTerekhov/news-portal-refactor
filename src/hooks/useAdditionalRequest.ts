import { useState } from 'react';

import { useNewsAPI, useFiltersAction } from 'reduxStore/hooks';

import { usePaginationContext, useSelectedDate } from 'contexts';
import type { CategoryRequest } from 'types';

export type SearchParamsObject = {
  query: string;
  period: string;
  category: string;
};

const TODAY_HOT_NEWS = 1;
const WEEKLY_NEWS = 7;
const MONTHLY_NEWS = 30;

const useAdditionalRequest = () => {
  const [searchParams, setSearchParams] = useState<SearchParamsObject>({
    query: '',
    period: '',
    category: '',
  });

  const {
    popularNews,
    newsByKeyword,
    newsByCategory,
    newsByDate,
    categoriesList,
    fetchByCategory,
    fetchByKeyword,
    fetchPopular,
    resetPreviousRequest,
    updateHeadline,
  } = useNewsAPI();
  const { filteredNews } = useFiltersAction();
  const { resetRequestDay } = useSelectedDate();
  const { resetPagination } = usePaginationContext();

  const showPopular =
    (newsByKeyword && newsByKeyword?.length === 0) ||
    (newsByCategory && newsByCategory?.length === 0) ||
    (newsByDate && newsByDate?.length === 0);

  const hasAnotherRequestResults =
    (popularNews && popularNews?.length > 0) ||
    (newsByKeyword && newsByKeyword?.length > 0) ||
    (newsByCategory && newsByCategory?.length > 0) ||
    (newsByDate && newsByDate?.length > 0);

  const getCategoriesList = () => categoriesList?.map((item) => item.display_name) || [];

  const updateSearchParams = (value: string, key: keyof SearchParamsObject | string) => {
    setSearchParams((prevParams) => ({ ...prevParams, [key]: value }));
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchParams(event.target.value.toLowerCase(), 'query');
  };

  const onHandleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchParams.query) {
      resetPagination();

      if (filteredNews?.length > 0) resetPreviousRequest();

      await fetchByKeyword({ query: searchParams.query });
      updateHeadline(`News by Keyword: ${searchParams.query}`);
      updateSearchParams('', 'query');
    }
  };

  const getNewsByCategory = async (section: CategoryRequest) => {
    if (section) {
      resetPagination();
      updateSearchParams(section, 'category');

      if (filteredNews?.length > 0) {
        resetPreviousRequest();
      }
      await fetchByCategory(section);
      updateHeadline(`Categorical Reviews by ${section}`);
    }
  };

  const getNewsByPeriod = async (selectedPeriod: string) => {
    if (selectedPeriod) {
      resetPagination();
      updateSearchParams(selectedPeriod, 'period');

      if (filteredNews && filteredNews.length > 0) {
        resetPreviousRequest();
      }

      switch (selectedPeriod) {
        case 'Today':
          updateHeadline(`${selectedPeriod}'s Hot News`);
          await fetchPopular({ period: TODAY_HOT_NEWS });
          break;
        case 'Week':
          updateHeadline(`${selectedPeriod} News`);
          await fetchPopular({ period: WEEKLY_NEWS });
          break;
        case 'Month':
          updateHeadline(`${selectedPeriod} News`);
          await fetchPopular({ period: MONTHLY_NEWS });
          break;
        default:
          break;
      }
    }
  };

  const resetSearchParams = () => setSearchParams({ query: '', period: '', category: '' });

  const handleResetRequests = async () => {
    if (hasAnotherRequestResults) {
      resetPagination();
      resetPreviousRequest();
      updateHeadline('Today`s Hot News');
      resetSearchParams();
      resetRequestDay();

      await fetchPopular({ period: TODAY_HOT_NEWS });
    }
  };

  return {
    ...searchParams,
    categoriesForDropdown: getCategoriesList(),
    showPopular,
    updateSearchParams,
    onChangeInput,
    onHandleSearch,
    getNewsByCategory,
    getNewsByPeriod,
    handleResetRequests,
  };
};

export default useAdditionalRequest;
