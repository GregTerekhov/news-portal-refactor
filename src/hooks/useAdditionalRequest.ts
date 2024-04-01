import { useState } from 'react';
import memoizeOne from 'memoize-one';

import type { CategoryRequest } from 'types';
import { useNewsAPIRedux, useFiltersRedux } from 'reduxStore/hooks';
import { usePaginationContext, useSelectedDateContext } from 'contexts';

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
    newsByKeyword,
    newsByCategory,
    newsByDate,
    categoriesList,
    fetchByCategory,
    fetchByKeyword,
    fetchPopular,
    resetPreviousRequest,
    updateHeadline,
  } = useNewsAPIRedux();
  const { filteredNews } = useFiltersRedux();
  const { resetRequestDay } = useSelectedDateContext();
  const { resetPagination } = usePaginationContext();

  const showPopular =
    (newsByKeyword && newsByKeyword?.length === 0) ||
    (newsByCategory && newsByCategory?.length === 0) ||
    (newsByDate && newsByDate?.length === 0);

  const hasAnotherRequestResults =
    Object.values(searchParams).some((value) => value !== '') ||
    (newsByDate && newsByDate?.length > 0);

  const getCategoriesList = memoizeOne((): string[] => {
    return categoriesList?.map((item) => item.display_name) || [];
  });

  const updateSearchParams = (value: string, key: keyof SearchParamsObject | string): void => {
    setSearchParams((prevParams) => ({ ...prevParams, [key]: value }));
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    updateSearchParams(event.target.value.toLowerCase(), 'query');
  };

  const onHandleSearch = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (searchParams.query) {
      resetPagination();

      if (filteredNews?.length > 0) resetPreviousRequest();

      await fetchByKeyword({ query: searchParams.query });
      updateHeadline(`News by Keyword: ${searchParams.query}`);
      updateSearchParams('', 'query');
    }
  };

  const getNewsByCategory = async (section: CategoryRequest): Promise<void> => {
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

  const getNewsByPeriod = async (selectedPeriod: string): Promise<void> => {
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

  const resetSearchParams = (): void => setSearchParams({ query: '', period: '', category: '' });

  const handleResetRequests = async (): Promise<void> => {
    if (hasAnotherRequestResults) {
      resetPagination();
      resetPreviousRequest();
      updateHeadline(filteredNews?.length === 0 ? 'Today`s Hot News' : 'Filtered News');
      resetSearchParams();
      resetRequestDay();

      await fetchPopular({ period: TODAY_HOT_NEWS });
    }
  };

  return {
    ...searchParams,
    hasAnotherRequestResults,
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
