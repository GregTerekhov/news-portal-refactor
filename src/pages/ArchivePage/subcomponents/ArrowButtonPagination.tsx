import React, { FC } from 'react';

import { ICON_SIZES } from 'constants/iconSizes';

import { SvgIcon } from 'ui';

interface ArrowButtonProps {
  handlePageChange: (newPage: number) => void;
  currentPage: number;
  label: string;
  position: number;
  iconClass: string;
}

const ArrowButtonPagination: FC<ArrowButtonProps> = ({
  handlePageChange,
  currentPage,
  label,
  position,
  iconClass,
}) => {
  const isLeftArrow = position < currentPage;
  const buttonStyles =
    'group inline-flex items-center gap-x-2 rounded-full p-2.5 transition-colors duration-500 hover:bg-accentBase disabled:pointer-events-none disabled:opacity-50 dark:hover:bg-accentBase dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600';

  return (
    <button
      type='button'
      onClick={() => handlePageChange(isLeftArrow ? currentPage - 1 : currentPage + 1)}
      disabled={currentPage === position}
      className={`${buttonStyles}`}
    >
      <span aria-hidden='true'>
        <SvgIcon
          svgName='arrow'
          size={ICON_SIZES.xsIcon14}
          className={`${iconClass} fill-accentBase group-hover:fill-whiteBase dark:fill-whiteBase`}
        />
      </span>
      <span className='sr-only'>{label}</span>
    </button>
  );
};

export default ArrowButtonPagination;
