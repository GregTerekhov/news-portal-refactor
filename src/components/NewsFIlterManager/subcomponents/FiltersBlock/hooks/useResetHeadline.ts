import { TriggerType } from 'types';

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
    if (filteredNews?.length === 0) {
      return;
    }

    if (newsByKeyword?.length > 0) {
      handleChangeHeadline(TriggerType.Keyword, query);
    } else if (newsByCategory?.length > 0) {
      handleChangeHeadline(TriggerType.Category, category);
    } else if (period) {
      handleChangeHeadline(TriggerType.Period, period);
    } else if (newsByDate?.length > 0 && !!beginDate && !!endDate) {
      const dateToHeading = formatDateRange(memoizedSelectedRequestDate);

      handleChangeHeadline(TriggerType.Date, dateToHeading);
    } else {
      handleChangeHeadline(TriggerType.Reset);
    }
  };

  return { resetHeadline };
};

export default useResetHeadline;
