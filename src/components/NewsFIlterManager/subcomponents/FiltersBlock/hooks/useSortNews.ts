import { PartialVotedNewsArray, SortDirection } from 'types';

import { useDBRedux, useFiltersRedux } from 'reduxStore/hooks';

import { useActiveLinks, useChooseRenderingNews } from 'hooks';
import { formatSortedDate } from 'helpers';

const useSortNews = () => {
  const { getFilteredNews, setIsSorted } = useFiltersRedux();
  const { allFavourites, allReads } = useDBRedux();

  const { isHomeActive, isFavoriteActive, isReadActive } = useActiveLinks();
  const { rebuiltNews } = useChooseRenderingNews();

  const getSortedNewsArray = (): PartialVotedNewsArray => {
    //Створення нового масива об'єктів для сортованих новин в залежності від локації

    if (isHomeActive) {
      return [...rebuiltNews];
    } else if (isFavoriteActive) {
      return [...allFavourites];
    } else if (isReadActive) {
      return [...allReads];
    }

    return [];
  };

  const handleSortNews = (order: SortDirection): void => {
    if (rebuiltNews.length === 0) return;

    setIsSorted(true);

    //Створення нового масива об'єктів для сортованих новин в залежності від локації
    const sortedNews = getSortedNewsArray();

    //Сортування нового масива об'єктів новин
    sortedNews.sort((a, b) => {
      const dateA = formatSortedDate(a.publishDate);
      const dateB = formatSortedDate(b.publishDate);

      return order === SortDirection.Ascending ? dateA - dateB : dateB - dateA;
    });

    //Зміна глобального стану фільтрованих новин
    getFilteredNews(sortedNews);
  };

  return { handleSortNews };
};

export default useSortNews;
