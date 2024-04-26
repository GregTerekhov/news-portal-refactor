import { useCallback, useMemo, useState } from 'react';

import type { IHistoryLog } from 'types';

const FIRST_PAGE = 1;
const ROWS_PER_PAGE = 7;

const useDeletedNewsControls = (logData: IHistoryLog[]) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(FIRST_PAGE);

  const filteredLogData: IHistoryLog[] = useMemo(() => {
    return searchValue
      ? logData.filter((log) => log.title.toLowerCase().includes(searchValue.toLowerCase()))
      : logData;
  }, [logData, searchValue]);

  const totalRows = filteredLogData.length;
  const totalPages = Math.ceil(totalRows / ROWS_PER_PAGE);

  const startIndex = (currentPage - FIRST_PAGE) * ROWS_PER_PAGE;
  const endIndex = startIndex + ROWS_PER_PAGE;
  const displayedRows = filteredLogData.slice(startIndex, endIndex);

  //Функція пошуку видалених з архиву новин та зміни станів видалених новин по запиту та скидання значення пагінації
  const handleSearchNews = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    const query = event.target.value;
    setSearchValue(query);
    setCurrentPage(FIRST_PAGE);
  }, []);

  //Змінення значення стану пагінації
  const handlePageChange = useCallback(
    (newPage: number): void => {
      if (newPage >= FIRST_PAGE && newPage <= totalPages) {
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
