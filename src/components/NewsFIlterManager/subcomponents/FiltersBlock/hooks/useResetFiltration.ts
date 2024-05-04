import { useFiltersRedux } from 'reduxStore/hooks';
import {
  useFiltersStateContext,
  usePaginationContext,
  useReadSortStateContext,
  useSelectedDateContext,
} from 'contexts';

import { useActiveLinks } from 'hooks';
import useResetHeadline from './useResetHeadline';

const useResetFiltration = () => {
  const { filteredNews } = useFiltersRedux();
  const { resetAllFiltersResults, setIsSorted } = useFiltersRedux();

  const { resetFiltersDay } = useSelectedDateContext();
  const { setSortedDates } = useReadSortStateContext();
  const { resetPagination } = usePaginationContext();
  const { setSelectedMaterialType, resetFiltersState } = useFiltersStateContext();

  const { isHomeActive } = useActiveLinks();

  const { resetHeadline } = useResetHeadline();

  //Скидання значень фільтрації
  const handleResetFiltration = async (): Promise<void> => {
    if (isHomeActive) {
      //Скидання заголовка новин, якщо є фільтровані новини на домашній сторінці
      resetHeadline();

      //Скидання значення пагінації, якщо користувач знаходився не на першій сторінці пагінації
      resetPagination();
    }

    if (filteredNews?.length > 0) {
      setIsSorted(false);
    }

    //Скидання інших значень
    setSelectedMaterialType('');
    resetFiltersState();
    resetAllFiltersResults();
    resetFiltersDay();
    setSortedDates([]);
  };
  return { handleResetFiltration };
};

export default useResetFiltration;
