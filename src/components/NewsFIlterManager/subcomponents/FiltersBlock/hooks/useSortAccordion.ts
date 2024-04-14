import { useFiltersRedux } from 'reduxStore/hooks';
import { useReadSortStateContext } from 'contexts';

import { useReadNewsContent } from 'hooks';

const useSortAccordion = () => {
  const { sortResults } = useFiltersRedux();
  const { setSortedDates } = useReadSortStateContext();

  const sortedAccordionDates = useReadNewsContent();

  //Функція сортування акордеонів на сторінці Read
  const handleSortRead = async (order: string): Promise<void> => {
    if (!sortedAccordionDates) return;

    //Створення нового масива акордеонів та сортування в залежності від напрямку сортування
    const sortedDates =
      order === 'asc'
        ? Array.from(sortedAccordionDates).sort().reverse()
        : Array.from(sortedAccordionDates).sort();

    //Зміна глобального стану фільтрованих (сортованих) новин
    setSortedDates(sortedDates);
    sortResults(true);
  };

  return { handleSortRead };
};

export default useSortAccordion;
