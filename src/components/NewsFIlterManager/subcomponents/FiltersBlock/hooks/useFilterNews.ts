import { ResultsState, TriggerType } from 'types';

import { useDBRedux, useFiltersRedux } from 'reduxStore/hooks';
import { useFiltersStateContext, usePaginationContext } from 'contexts';

import { useActiveLinks, useChooseRenderingNews, useHeadline } from 'hooks';
import { getCrossFilteredNews, hasNonEmptyValue } from '../assistants';

const useFilterNews = () => {
  const { showResultsState, getFilteredNews } = useFiltersRedux();
  const { allFavourites, allReads } = useDBRedux();

  const { filters } = useFiltersStateContext();
  const { resetPagination } = usePaginationContext();

  const activeLinks = useActiveLinks();
  const { rebuiltNews } = useChooseRenderingNews();
  const { handleChangeHeadline } = useHeadline();

  const { isHomeActive } = activeLinks;

  //Функція фільтрації по періодам дат
  const handleFiltration = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();

    //Умова виходу з функції, якщо немає значень фільтрів
    if (!filters || !rebuiltNews || rebuiltNews?.length === 0 || !hasNonEmptyValue(filters)) return;

    //Встановлення значення глобального стану завантаження новин
    showResultsState(ResultsState.Loading);

    //Визначення заголовка, якщо локація - Домашня сторінка та скидання значення пагінації, якщо користувач знаходиться не на першій сторінці пагінації
    if (isHomeActive) {
      handleChangeHeadline(TriggerType.Filtering);
      resetPagination();
    }

    const filteredNews = getCrossFilteredNews(
      rebuiltNews,
      filters,
      activeLinks,
      allFavourites,
      allReads,
    );

    if (filteredNews?.length === 0) {
      showResultsState(ResultsState.Empty);
      return;
    }

    //Якщо є значення фільтрів зміна глобальних станів фільтрованих новин
    showResultsState(ResultsState.Fulfilled);
    getFilteredNews(filteredNews);
  };

  return { handleFiltration };
};

export default useFilterNews;
