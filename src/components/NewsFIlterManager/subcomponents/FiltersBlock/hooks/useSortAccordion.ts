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

    //Створення нового масива акордеонів та сортування в залежності від напрямку сортування
    const sortedDates =
      order === 'asc'
        ? Array.from(sortedAccordionDates).sort().reverse()
        : Array.from(sortedAccordionDates).sort();

    //Зміна глобального стану фільтрованих (сортованих) новин
    setSortedDates(sortedDates);
    setIsSorted(true);
  };

  return { handleSortRead };
};

export default useSortAccordion;
