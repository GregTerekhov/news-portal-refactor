import { useState } from 'react';
import { format, isAfter, startOfToday } from 'date-fns';

import useFilterCollector from './useFilterCollector';
import useNewsAPICollector from './useNewsAPICollector';
import usePopUp from './usePopUp';
export interface SelectedDate {
  beginDate: string | null;
  endDate: string | null;
}

const useAdditionalRequest = () => {
  const [query, setQuery] = useState<string>('');
  const [period, setPeriod] = useState<string>('');
  const [category, setCategory] = useState<string>('');
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
    updateHeadline,
  } = useNewsAPICollector();
  const { setIsOpenCalendar } = usePopUp();
  const { filteredNews } = useFilterCollector();

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

  const onHandleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query) {
      if (filteredNews && filteredNews.length > 0) {
        resetPreviousRequest();
        await fetchByKeyword(query);
        updateHeadline(`News by Keyword: ${query}`);
        setQuery('');
      } else {
        await fetchByKeyword(query);
        updateHeadline(`News by Keyword: ${query}`);
        setQuery('');
      }
    }
  };

  const getNewsByCategory = async (section: string) => {
    if (section) {
      setCategory(section);

      if (filteredNews && filteredNews.length > 0) {
        resetPreviousRequest();
        await fetchByCategory(section);
        updateHeadline(`Categorical Reviews by ${section}`);
      } else {
        await fetchByCategory(section);
        updateHeadline(`Categorical Reviews by ${section}`);
      }
    }
  };

  const getNewsByPeriod = async (period: string) => {
    if (period === 'Today') {
      setPeriod('Today');
      updateHeadline("Today's Hot News");
      if (filteredNews && filteredNews.length > 0) {
        resetPreviousRequest();
        await fetchPopular('1');
      } else {
        fetchPopular('1');
      }
    } else if (period === 'Week') {
      setPeriod('Week');
      updateHeadline('Weekly News');
      if (filteredNews && filteredNews.length > 0) {
        resetPreviousRequest();
        await fetchPopular('7');
      } else {
        fetchPopular('7');
      }
    } else if (period === 'Month') {
      setPeriod('Month');
      updateHeadline('Monthly News');
      if (filteredNews && filteredNews.length > 0) {
        resetPreviousRequest();
        await fetchPopular('30');
      } else {
        fetchPopular('30');
      }
    }
  };

  const handleDateRequest = async (date: Date) => {
    if (!isAfter(date, today)) {
      if (!beginDate) {
        setBeginDate(date);
      } else {
        try {
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
          updateHeadline(
            `News by Date: from ${newSelectedDate.beginDate} to ${newSelectedDate.endDate}`,
          );

          if (filteredNews && filteredNews.length > 0) {
            resetPreviousRequest();
            await fetchByDate(newSelectedDate);
            setBeginDate(null);

            if (
              newSelectedDate.beginDate &&
              newSelectedDate.beginDate !== null &&
              newSelectedDate.endDate &&
              newSelectedDate.endDate !== null
            ) {
              setIsOpenCalendar(false);
            }
          } else {
            await fetchByDate(newSelectedDate);
            setBeginDate(null);
            if (
              newSelectedDate.beginDate &&
              newSelectedDate.beginDate !== null &&
              newSelectedDate.endDate &&
              newSelectedDate.endDate !== null
            ) {
              setIsOpenCalendar(false);
            }
          }
        } catch (error) {}
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
      updateHeadline('Today`s Hot News');
      setQuery('');
      setPeriod('');
      setCategory('');
      setSelectedRequestDate({
        beginDate: null,
        endDate: null,
      });
      setSelectedRequestDate({ beginDate: null, endDate: null });
      await fetchPopular('1');
    }
  };

  return {
    query,
    period,
    category,
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
