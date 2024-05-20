import memoizeOne from 'memoize-one';

import { TimePeriodRequest, TriggerType, type CategoryRequest } from 'types';

import { useNewsAPIRedux, useFiltersRedux } from 'reduxStore/hooks';
import { useAdditionRequestContext, usePaginationContext, useSelectedDateContext } from 'contexts';

import { useHeadline } from 'hooks';

const useAdditionalRequest = () => {
  const {
    newsByKeyword,
    newsByCategory,
    newsByDate,
    categoriesList,
    fetchByCategory,
    fetchByKeyword,
    fetchPopular,
    resetPreviousRequest,
  } = useNewsAPIRedux();
  const { filteredNews, resetAllFiltersResults } = useFiltersRedux();

  const { resetRequestDay } = useSelectedDateContext();
  const { resetPagination } = usePaginationContext();
  const { searchParams, updateSearchParams, resetSearchParams, hasRequestValue } =
    useAdditionRequestContext();

  const { handleChangeHeadline } = useHeadline();

  const hasAnotherRequest =
    newsByKeyword?.length > 0 || newsByCategory?.length > 0 || newsByDate?.length > 0;

  const getCategoriesList = memoizeOne(
    (): string[] => categoriesList.map((item) => item.display_name) || [],
  );

  const resetRequest = (): void => {
    resetPagination();

    if (filteredNews?.length > 0) {
      resetPreviousRequest();
      resetAllFiltersResults();
    }
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    updateSearchParams(event.target.value.toLowerCase(), 'query');
  };

  const onHandleSearch = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (searchParams.query) {
      resetRequest();
      handleChangeHeadline(TriggerType.Keyword, searchParams.query);

      await fetchByKeyword({ query: searchParams.query });
    }
  };

  const getNewsByCategory = async (section: CategoryRequest): Promise<void> => {
    if (section) {
      resetRequest();
      updateSearchParams(section, 'category');
      handleChangeHeadline(TriggerType.Category, section);

      await fetchByCategory(section);
    }
  };

  const getNewsByPeriod = async (selectedPeriod: string): Promise<void> => {
    if (selectedPeriod) {
      resetRequest();
      updateSearchParams(selectedPeriod, 'period');
      handleChangeHeadline(TriggerType.Period, selectedPeriod);

      switch (selectedPeriod) {
        case 'Today':
          await fetchPopular({ period: TimePeriodRequest.Today });
          break;
        case 'Week':
        case 'Month':
          await fetchPopular({
            period: selectedPeriod === 'Week' ? TimePeriodRequest.Week : TimePeriodRequest.Month,
          });
          break;
        default:
          break;
      }
    }
  };

  const handleResetRequests = async (): Promise<void> => {
    resetPagination();
    resetPreviousRequest();

    await fetchPopular({ period: TimePeriodRequest.Today });

    if (hasAnotherRequest) {
      resetRequestDay();
    }
    if (hasRequestValue) {
      filteredNews?.length === 0
        ? handleChangeHeadline(TriggerType.Reset)
        : handleChangeHeadline(TriggerType.Filtering);

      resetSearchParams();
    }
  };

  return {
    categoriesForDropdown: getCategoriesList(),
    onChangeInput,
    onHandleSearch,
    getNewsByCategory,
    getNewsByPeriod,
    handleResetRequests,
  };
};

export default useAdditionalRequest;
