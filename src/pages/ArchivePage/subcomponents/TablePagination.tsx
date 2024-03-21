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
  const tableButtonStyles =
    'flex w-10 h-10 items-center justify-center rounded-full py-2.5 text-small text-darkBase transition-colors duration-500 hocus:bg-accentBase hocus:text-whiteBase dark:text-whiteBase dark:hocus:bg-accentBase lg:text-medium';

  return (
    <nav className='flex items-center space-x-1 px-4 py-2'>
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
          className={`${tableButtonStyles} ${currentPage === index + 1 ? 'bg-accentBase text-whiteBase' : 'bg-transparent text-darkBase dark:text-whiteBase'}`}
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
