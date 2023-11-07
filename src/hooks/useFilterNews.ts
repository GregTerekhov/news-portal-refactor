import { applyCrossFilters } from 'helpers';
import { useState } from 'react';
import { filterNews } from 'redux/filterSlice';
import { useAppDispatch } from 'redux/hooks';
import { Filters, PartialVotedNewsArray } from 'types';
import useChooseRenderingNews from './useChooseRenderingNews';

type FilterHookProps = {
  activeLinks: {
    isHomeActive: boolean;
    isFavoriteActive: boolean;
    isReadActive: boolean;
  };
  setShowDropdown: (value: React.SetStateAction<boolean>) => void;
};

const useFilterNews = ({ activeLinks, setShowDropdown }: FilterHookProps) => {
  const [filters, setFilters] = useState<Filters>({
    keyword: '',
    title: '',
    author: '',
    publisher: '',
    materialType: '',
  });

  const { rebuildedNews } = useChooseRenderingNews({ activeLinks });

  const dispatch = useAppDispatch();

  const handleChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleMaterialTypeChange = (selectedType: string) => {
    setFilters({
      ...filters,
      materialType: selectedType,
    });
  };

  const handleFiltration = (event: React.FormEvent) => {
    event.preventDefault();

    if (rebuildedNews && rebuildedNews.length > 0) {
      const filteredNews = applyCrossFilters(rebuildedNews, filters);

      if (filteredNews) {
        dispatch(filterNews(filteredNews));
      }
    } else {
      const defaultFilteredNews: PartialVotedNewsArray = [];
      dispatch(filterNews(defaultFilteredNews));
    }
    setFilters({
      keyword: '',
      title: '',
      author: '',
      publisher: '',
      materialType: '',
    });

    setShowDropdown(false);
  };

  const handleSort = (order: string) => {
    if (rebuildedNews && rebuildedNews?.length > 0) {
      const sortedNews = [...rebuildedNews];

      sortedNews.sort((a, b) => {
        const formatDate = (dateStr: string | undefined) => {
          if (dateStr) {
            const [day, month, year] = dateStr.split('/').map(Number);
            return new Date(year, month - 1, day).getTime();
          }
          return 0;
        };
        const dateA = formatDate(a.publishDate);
        const dateB = formatDate(b.publishDate);

        if (order === 'asc') {
          return dateA - dateB;
        } else if (order === 'desc') {
          return dateB - dateA;
        }

        return 0;
      });
      dispatch(filterNews(sortedNews));
    }
  };

  const handleReset = () => {
    setFilters({
      keyword: '',
      title: '',
      author: '',
      publisher: '',
      materialType: '',
    });
  };

  return {
    filters,
    handleChangeFilter,
    handleMaterialTypeChange,
    handleFiltration,
    handleSort,
    handleReset,
  };
};

export default useFilterNews;
