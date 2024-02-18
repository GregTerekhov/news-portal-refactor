import React, { FC } from 'react';

import { ICON_SIZES } from 'constants/iconSizes';

import { SvgIcon } from 'ui';

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
      <button
        type='button'
        onClick={() => handlePageChange(currentPage - 1)}
        className='inline-flex items-center gap-x-2 rounded-full p-2.5 hover:bg-greyAlt/[.2] disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-whiteBase/[.2] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
      >
        <span aria-hidden='true'>
          <SvgIcon
            svgName='icon-arrow'
            size={ICON_SIZES.xsIcon14}
            className='rotate-90 fill-accentBase dark:fill-whiteBase'
          />
        </span>
        <span className='sr-only'>Previous</span>
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          type='button'
          aria-current='page'
          className='flex min-w-10 items-center justify-center rounded-full py-2.5 text-sm text-gray-800 hover:bg-greyAlt/[.2] dark:text-white dark:hover:bg-whiteBase/[.2]'
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        type='button'
        onClick={() => handlePageChange(currentPage + 1)}
        className='inline-flex items-center gap-x-2 rounded-full p-2.5 text-sm text-gray-800 hover:bg-greyAlt/[.2] disabled:pointer-events-none disabled:opacity-50  dark:hover:bg-whiteBase/[.2] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
      >
        <span className='sr-only'>Next</span>
        <span aria-hidden='true'>
          <SvgIcon
            svgName='icon-arrow'
            size={ICON_SIZES.xsIcon14}
            className='-rotate-90 fill-accentBase dark:fill-whiteBase'
          />
        </span>
      </button>
    </nav>
  );
};

export default TablePagination;
