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

  const showPopular = !newsByKeyword?.length || !newsByCategory?.length || !newsByDate?.length;

  const hasAnotherRequestResults =
    Object.values(searchParams).some((value) => value !== '') || newsByDate?.length > 0;

  const getCategoriesList = memoizeOne(
    (): string[] => categoriesList?.map((item) => item.display_name) || [],
  );

  const resetRequest = () => {
    if (filteredNews?.length > 0) resetPreviousRequest();
  };

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
      resetRequest();
      updateHeadline(`News by Keyword: ${searchParams.query}`);
      updateSearchParams('', 'query');

      await fetchByKeyword({ query: searchParams.query });
    }
  };

  const getNewsByCategory = async (section: CategoryRequest): Promise<void> => {
    if (section) {
      resetPagination();
      resetRequest();
      updateSearchParams(section, 'category');
      updateHeadline(`Categorical Reviews by ${section}`);

      await fetchByCategory(section);
    }
  };

  const getNewsByPeriod = async (selectedPeriod: string): Promise<void> => {
    if (selectedPeriod) {
      resetPagination();
      resetRequest();
      updateSearchParams(selectedPeriod, 'period');

      switch (selectedPeriod) {
        case 'Today':
          updateHeadline(`${selectedPeriod}'s Hot News`);
          await fetchPopular({ period: TODAY_HOT_NEWS });
          break;
        case 'Week':
        case 'Month':
          updateHeadline(`${selectedPeriod} News`);
          await fetchPopular({ period: selectedPeriod === 'Week' ? WEEKLY_NEWS : MONTHLY_NEWS });
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
