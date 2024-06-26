import { SortDirection } from 'types';

import { useFiltersRedux } from 'reduxStore/hooks';
import { useReadSortStateContext } from 'contexts';

import { useReadNewsContent } from 'hooks';

const useSortAccordion = () => {
  const { setIsSorted } = useFiltersRedux();

  const { setSortedDates } = useReadSortStateContext();

  const sortedAccordionDates = useReadNewsContent();

  //Функція сортування акордеонів на сторінці Read
  const handleSortAccordion = async (order: SortDirection): Promise<void> => {
    const filteredDates = sortedAccordionDates.filter((date): date is string => date !== undefined);

    //Створення нового масива акордеонів та сортування в залежності від напрямку сортування
    const sortedDates =
      order === SortDirection.Ascending ? filteredDates.sort().reverse() : filteredDates.sort();

    //Зміна глобального стану фільтрованих (сортованих) новин
    setSortedDates(sortedDates);
    setIsSorted(true);
  };

  return { handleSortAccordion };
};

export default useSortAccordion;
