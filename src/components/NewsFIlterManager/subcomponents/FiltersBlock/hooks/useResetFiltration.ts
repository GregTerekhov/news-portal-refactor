import { useFiltersRedux, useNewsAPIRedux } from 'reduxStore/hooks';
import {
  useAdditionRequestContext,
  useFiltersStateContext,
  usePaginationContext,
  useReadSortStateContext,
  useSelectedDateContext,
} from 'contexts';

import { formatDateRange } from 'helpers';
import { useActiveLinks, useHeadline } from 'hooks';

const useResetFiltration = () => {
  const { filteredNews } = useFiltersRedux();
  const { newsByKeyword, newsByCategory, newsByDate } = useNewsAPIRedux();
  const { resetAllFiltersResults, setIsSorted } = useFiltersRedux();

  const { searchParams } = useAdditionRequestContext();
  const { memoizedSelectedRequestDate, resetFiltersDay } = useSelectedDateContext();
  const { setSortedDates } = useReadSortStateContext();
  const { resetPagination } = usePaginationContext();
  const { setSelectedMaterialType, resetFilters } = useFiltersStateContext();

  const { isHomeActive } = useActiveLinks();
  const { handleChangeHeadline } = useHeadline();

  const resetHeadline = () => {
    if (filteredNews?.length > 0) {
      if (newsByKeyword?.length > 0) {
        handleChangeHeadline('keyword', searchParams.query);
      } else if (newsByCategory?.length > 0) {
        handleChangeHeadline('category', searchParams.category);
      } else if (searchParams.period) {
        handleChangeHeadline('period', searchParams.period);
      } else if (
        newsByDate?.length > 0 &&
        !!memoizedSelectedRequestDate.beginDate &&
        !!memoizedSelectedRequestDate.endDate
      ) {
        const dateToHeading = formatDateRange(memoizedSelectedRequestDate);
        handleChangeHeadline('date', dateToHeading);
      } else {
        handleChangeHeadline('reset');
      }
    } else {
      handleChangeHeadline('reset');
    }
  };

  //Скидання значень фільтрації
  const handleResetFiltration = async (): Promise<void> => {
    if (isHomeActive) {
      //Скидання заголовка новин, якщо є фільтровані новини на домашній сторінці
      resetHeadline();

      //Скидання значення пагінації, якщо користувач знаходився не на першій сторінці пагінації
      resetPagination();
    }

    //Скидання інших значень
    resetFilters();
    setSelectedMaterialType('');
    resetAllFiltersResults();
    resetFiltersDay();
    setSortedDates([]);
    setIsSorted(false);
  };
  return { handleResetFiltration };
};

export default useResetFiltration;
