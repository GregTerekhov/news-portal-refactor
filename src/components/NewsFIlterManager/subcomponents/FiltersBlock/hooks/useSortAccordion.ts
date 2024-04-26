import { useFiltersRedux } from 'reduxStore/hooks';
import { useReadSortStateContext } from 'contexts';

import { useReadNewsContent } from 'hooks';

const useSortAccordion = () => {
  const { setIsSorted } = useFiltersRedux();
  const { setSortedDates } = useReadSortStateContext();

  const sortedAccordionDates = useReadNewsContent();

  //Функція сортування акордеонів на сторінці Read
  const handleSortRead = async (order: string): Promise<void> => {
    if (!sortedAccordionDates?.length) return;

    // Фільтрація масиву для уникнення значень undefined в масиві
    const filteredDates =
      sortedAccordionDates && sortedAccordionDates?.filter((date) => typeof date === 'string');

    if (!filteredDates.length) return;

    //Створення нового масива акордеонів та сортування в залежності від напрямку сортування
    const sortedDates = order === 'asc' ? filteredDates.sort().reverse() : filteredDates.sort();

    const filteredAndDefinedDates = sortedDates as string[];

    //Зміна глобального стану фільтрованих (сортованих) новин
    setSortedDates(filteredAndDefinedDates);
    setIsSorted(true);
  };

  return { handleSortRead };
};

export default useSortAccordion;
