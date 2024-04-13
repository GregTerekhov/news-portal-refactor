import { useCallback, useMemo, useState } from 'react';

import type { IHistoryLog } from 'types';

const ROWS_PER_PAGE = 4;

const useDeletedNewsControls = (logData: IHistoryLog[]) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredLogData: IHistoryLog[] = useMemo(() => {
    return searchValue
      ? logData.filter((log) => log.title.toLowerCase().includes(searchValue.toLowerCase()))
      : logData;
  }, [logData, searchValue]);

  const totalRows = filteredLogData.length;
  const totalPages = Math.ceil(totalRows / ROWS_PER_PAGE);

  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const endIndex = startIndex + ROWS_PER_PAGE;
  const displayedRows = filteredLogData.slice(startIndex, endIndex);

  //Функція пошуку видалених з архиву новин та зміни станів видалених новин по запиту та скидання значення пагінації
  const handleSearchNews = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    const query = event.target.value;
    setSearchValue(query);
    setCurrentPage(1);
  }, []);

  //Змінення значення стану пагінації
  const handlePageChange = useCallback(
    (newPage: number): void => {
      if (newPage >= 1 && newPage <= totalPages) {
        setCurrentPage(newPage);
      }
    },
    [totalPages],
  );

  return {
    searchValue,
    currentPage,
    totalPages,
    displayedRows,
    handleSearchNews,
    handlePageChange,
  };
};

export default useDeletedNewsControls;
