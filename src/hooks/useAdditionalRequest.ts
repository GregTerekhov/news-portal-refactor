import { useState } from 'react';
import { format, isAfter, startOfToday } from 'date-fns';

import useNewsAPICollector from './useNewsAPICollector';
import usePopUp from './usePopUp';

export interface SelectedDate {
  beginDate: string | null;
  endDate: string | null;
}

const useAdditionalRequest = () => {
  const [query, setQuery] = useState<string>('');
  const [beginDate, setBeginDate] = useState<Date | null>(null);
  const [selectedRequestDate, setSelectedRequestDate] = useState<SelectedDate>({
    beginDate: null,
    endDate: null,
  });

  const {
    popularNews,
    newsByKeyword,
    newsByCategory,
    newsByDate,
    categoriesList,
    fetchByCategory,
    fetchByDate,
    fetchByKeyword,
    fetchPopular,
    resetPreviousRequest,
  } = useNewsAPICollector();
  const { setIsOpenCalendar } = usePopUp();

  const today = startOfToday();

  const showPopular =
    (newsByKeyword && newsByKeyword?.length === 0) ||
    (newsByCategory && newsByCategory?.length === 0) ||
    (newsByDate && newsByDate?.length === 0);

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
      fetchByKeyword(query);
      setQuery('');
    }
  };

  const getNewsByCategory = async (section: string) => {
    if (section) {
      resetPreviousRequest();
      await fetchByCategory(section);
    }
  };

  const getNewsByPeriod = async (period: string) => {
    resetPreviousRequest();

    if (period === 'Today') {
      await fetchPopular('1');
    } else if (period === 'Week') {
      await fetchPopular('7');
    } else if (period === 'Month') {
      await fetchPopular('30');
    }
  };

  const handleDateRequest = async (date: Date) => {
    if (!isAfter(date, today)) {
      if (!beginDate) {
        setBeginDate(date);
      } else {
        let newSelectedDate: { beginDate: string | null; endDate: string | null };
        if (isAfter(date, beginDate)) {
          newSelectedDate = {
            beginDate: format(beginDate, 'yyyyMMdd'),
            endDate: format(date, 'yyyyMMdd'),
          };
        } else {
          newSelectedDate = {
            beginDate: format(date, 'yyyyMMdd'),
            endDate: format(beginDate, 'yyyyMMdd'),
          };
        }

        setSelectedRequestDate(newSelectedDate);
        resetPreviousRequest();
        await fetchByDate(newSelectedDate);
        setBeginDate(null);
        setIsOpenCalendar(false);
      }
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
      setSelectedRequestDate({ beginDate: null, endDate: null });
      await fetchPopular('1');
    }
  };

  return {
    query,
    selectedRequestDate,
    categoriesForDropdown,
    showPopular,
    onChangeInput,
    onHandleSearch,
    getNewsByCategory,
    getNewsByPeriod,
    handleDateRequest,
    handleResetRequests,
  };
};

export default useAdditionalRequest;
