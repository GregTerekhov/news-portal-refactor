import React, { FC } from 'react';

import ArrowButtonPagination from './ArrowButtonPagination';
import PaginationButtons from './PaginationButtons';

interface TablePaginationProps {
  handlePageChange: (newPage: number) => void;
  currentPage: number;
  totalPages: number;
}

const TablePagination: FC<TablePaginationProps> = ({
  handlePageChange,
  currentPage,
  totalPages,
}) => {
  return (
    <nav className='flex items-center space-x-1 py-2'>
      <ArrowButtonPagination
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        label='Previous'
        position={1}
        iconClass='rotate-90'
      />
      <PaginationButtons
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
      <ArrowButtonPagination
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        label='Next'
        position={totalPages}
        iconClass='-rotate-90'
      />
    </nav>
  );
};

export default TablePagination;
