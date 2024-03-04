import React, { FC } from 'react';

import ArrowButtonPagination from './ArrowButtonPagination';

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
    <nav className='flex items-center space-x-1'>
      <ArrowButtonPagination
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        label='Previous'
        position={1}
        iconClass='rotate-90'
      />
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          type='button'
          aria-current='page'
          className='flex min-w-10 items-center justify-center rounded-full py-2.5 text-small text-darkBase transition-colors duration-500 hover:bg-accentBase hover:text-whiteBase dark:text-whiteBase dark:hover:bg-accentBase lg:text-medium'
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
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
