import { useEffect, useState } from 'react';
import { format, isAfter, startOfToday } from 'date-fns';

import useNewsAPICollector from './useNewsAPICollector';
import usePopUp from './usePopUp';
import { useFilterCollector } from '.';

export interface SelectedDate {
  beginDate: string | null;
  endDate: string | null;
}

const useAdditionalRequest = () => {
  const [query, setQuery] = useState<string>('');
  const [period, setPeriod] = useState<string>('');
  const [headline, setHeadline] = useState<string>('');
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
  } = useNewsAPICollector();
  const { setIsOpenCalendar } = usePopUp();
  const { filteredNews } = useFilterCollector();

  const today = startOfToday();

  const showPopular =
    (newsByKeyword && newsByKeyword?.length === 0) ||
    (newsByCategory && newsByCategory?.length === 0) ||
    (newsByDate && newsByDate?.length === 0);

  useEffect(() => {
    console.log('Updating headline...');
    console.log('filteredNews:', filteredNews);
    console.log('newsByKeyword:', newsByKeyword);
    console.log('query:', query);
    console.log('newsByCategory:', newsByCategory);
    console.log('category:', category);
    console.log('newsByDate:', newsByDate);
    console.log('period:', period);

    const updateHeadline = async () => {
      if (filteredNews && filteredNews.length > 0) {
        await setHeadline('Filtered News');
      } else if (query) {
        if (newsByKeyword && newsByKeyword.length > 0) {
          await setHeadline(`News by Keyword: ${query}`);
        }
      } else if (category) {
        if (newsByCategory && newsByCategory.length > 0) {
          await setHeadline(`Categorical Reviews by ${category}`);
        }
      } else if (newsByDate && newsByDate.length > 0) {
        await setHeadline('News by Date');
      } else if (popularNews && popularNews.length > 0) {
        await setHeadline("Today's Hot News");
        if (period) {
          if (period === 'Today') {
            await setHeadline("Today's Hot News");
          } else if (period === 'Week') {
            await setHeadline('Weekly News');
          } else if (period === 'Month') {
            await setHeadline('Monthly News');
          }
        }
      }
    };
    updateHeadline();
  }, [
    popularNews,
    period,
    newsByKeyword,
    query,
    newsByCategory,
    category,
    newsByDate,
    filteredNews,
  ]);

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
        setQuery('');
      } else {
        await fetchByKeyword(query);
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
      } else await fetchByCategory(section);
    }
  };

  const getNewsByPeriod = async (period: string) => {
    if (period === 'Today') {
      setPeriod('Today');
      if (filteredNews && filteredNews.length > 0) {
        resetPreviousRequest();
        await fetchPopular('1');
      } else {
        fetchPopular('1');
      }
    } else if (period === 'Week') {
      setPeriod('Week');
      if (filteredNews && filteredNews.length > 0) {
        resetPreviousRequest();
        await fetchPopular('7');
      } else {
        fetchPopular('7');
      }
    } else if (period === 'Month') {
      setPeriod('Month');
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

        if (filteredNews && filteredNews.length > 0) {
          resetPreviousRequest();
          await fetchByDate(newSelectedDate);
          setBeginDate(null);
          setIsOpenCalendar(false);
        } else {
          await fetchByDate(newSelectedDate);
          setBeginDate(null);
          setIsOpenCalendar(false);
        }
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
    headline,
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
