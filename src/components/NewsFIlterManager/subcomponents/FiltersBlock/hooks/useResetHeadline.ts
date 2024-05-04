import { useFiltersRedux, useNewsAPIRedux } from 'reduxStore/hooks';
import { useAdditionRequestContext, useSelectedDateContext } from 'contexts';

import { formatDateRange } from 'helpers';
import { useHeadline } from 'hooks';

const useResetHeadline = () => {
  const { filteredNews } = useFiltersRedux();
  const { newsByKeyword, newsByCategory, newsByDate } = useNewsAPIRedux();
  const { searchParams } = useAdditionRequestContext();
  const { memoizedSelectedRequestDate } = useSelectedDateContext();

  const { handleChangeHeadline } = useHeadline();

  const { query, category, period } = searchParams;
  const { beginDate, endDate } = memoizedSelectedRequestDate;

  const resetHeadline = () => {
    if (filteredNews?.length > 0) {
      if (newsByKeyword?.length > 0) {
        handleChangeHeadline('keyword', query);
      } else if (newsByCategory?.length > 0) {
        handleChangeHeadline('category', category);
      } else if (period) {
        handleChangeHeadline('period', period);
      } else if (newsByDate?.length > 0 && !!beginDate && !!endDate) {
        const dateToHeading = formatDateRange(memoizedSelectedRequestDate);
        handleChangeHeadline('date', dateToHeading);
      } else {
        handleChangeHeadline('reset');
      }
    } else {
      return;
    }
  };

  return { resetHeadline };
};

export default useResetHeadline;
