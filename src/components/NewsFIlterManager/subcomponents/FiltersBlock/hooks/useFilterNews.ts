import { useDBRedux, useNewsAPIRedux, useFiltersRedux } from 'reduxStore/hooks';
import {
  useFiltersStateContext,
  usePaginationContext,
  useReadSortStateContext,
  useSelectedDateContext,
} from 'contexts';

import { useActiveLinks, useChooseRenderingNews } from 'hooks';
import { getCrossFilteredNews, hasNonEmptyValue } from '../assistants';

const useFilterNews = () => {
  const {
    showResultsState,
    getFilteredNews,
    resetAllFiltersResults,
    filteredNews,
    isSorted,
    sortResults,
  } = useFiltersRedux();
  const { updateHeadline } = useNewsAPIRedux();
  const { allFavourites, allReads } = useDBRedux();

  const { filters, setSelectedMaterialType, resetFilters } = useFiltersStateContext();
  const { setSortedDates } = useReadSortStateContext();
  const { resetFiltersDay } = useSelectedDateContext();
  const { resetPagination } = usePaginationContext();

  const activeLinks = useActiveLinks();
  const { rebuiltNews } = useChooseRenderingNews(activeLinks);

  const { isHomeActive } = activeLinks;

  //Функція фільтрації по періодам дат
  const handleFiltration = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();

    //Виведення alert, якщо є сортовані новини
    if (isSorted) {
      alert(`YOU CAN'T FILTERING AFTER SORTING. RESET THE SETTINGS AND TRY AGAIN`);
    }
    //Умова виходу з функції, якщо немає значень фільтрів
    if (!filters || !rebuiltNews || rebuiltNews?.length === 0 || !hasNonEmptyValue(filters)) return;

    //Встановлення значення глобального стану завантаження новин
    showResultsState('loading');

    //Визначення заголовка, якщо локація - Домашня сторінка та скидання значення пагінації, якщо користувач знаходиться не на першій сторінці пагінації
    if (isHomeActive) {
      updateHeadline('Filtered News');
      resetPagination();
    }

    //Крос-фільтрація по значенням фільтрів в залежності від локації
    const filteredNews = getCrossFilteredNews(
      rebuiltNews,
      filters,
      activeLinks,
      allFavourites,
      allReads,
    );

    //Якщо є значення фільтрів зміна глобальних станів фільтрованих новин
    if (filteredNews && filteredNews.length > 0) {
      getFilteredNews(filteredNews);
      showResultsState('full');
    } else {
      showResultsState('empty');
    }
    sortResults(false);
  };

  //Скидання значень фільтрації
  const handleReset = async (): Promise<void> => {
    //Скидання заголовка новин, якщо є фільтровані новини на домашній сторінці
    if (isHomeActive) {
      if (filteredNews?.length > 0) {
        updateHeadline("Today's Hot News");
      }

      //Скидання значення пагінації, якщо користувач знаходився не на першій сторінці пагінації
      resetPagination();
    }

    //Скидання інших значень
    resetFilters();
    setSelectedMaterialType('');
    resetAllFiltersResults();
    resetFiltersDay();
    setSortedDates([]);
    sortResults(false);
  };

  return {
    isSorted,
    handleFiltration,
    handleReset,
  };
};

export default useFilterNews;
