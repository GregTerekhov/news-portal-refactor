import { useState } from 'react';

import useChooseRenderingNews from './useChooseRenderingNews';
import { ActiveLinks } from './useActiveLinks';

type ISortAccordeonProps = {
  activeLinks: ActiveLinks;
};

const useSortAccordeon = ({ activeLinks }: ISortAccordeonProps) => {
  const { rebuildedNews } = useChooseRenderingNews({ activeLinks });

  const [sortedDates, setSortedDates] = useState<Array<string> | undefined>(() =>
    getSortedDatesState(),
  );

  function getSortedDatesState() {
    const publishedDate = rebuildedNews
      ?.map((news) => news.publishDate)
      .filter((date) => date !== undefined) as string[];

    // Використовуємо Set для визначення унікальних дат
    const uniqueDatesSet = new Set(publishedDate);

    // Перетворення і сортування дат
    const sortedDates = Array.from(uniqueDatesSet).sort().reverse();
    return sortedDates;
  }

  const handleSortAccordeon = (order: string) => {
    if (order === 'desc') {
      setSortedDates(sortedDates?.reverse());
    }
  };

  return { sortedDates, handleSortAccordeon };
};

export default useSortAccordeon;
