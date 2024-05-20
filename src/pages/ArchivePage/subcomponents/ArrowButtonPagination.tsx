import React, { FC } from 'react';

import { ButtonType, IconName, IconSizes } from 'types';

import { useDBRedux } from 'reduxStore/hooks';

import { SvgIcon } from 'ui';

interface IArrowButtonProps {
  handlePageChange: (newPage: number) => void;
  currentPage: number;
  label: string;
  position: number;
  iconClass: string;
}

const ArrowButtonPagination: FC<IArrowButtonProps> = ({
  handlePageChange,
  currentPage,
  label,
  position,
  iconClass,
}) => {
  const { archiveHistoryLog } = useDBRedux();

  const isLeftArrow = position < currentPage;
  const disabledCondition = currentPage === position || archiveHistoryLog?.length === 0;
  const buttonStyles =
    'group inline-flex items-center gap-x-2 rounded-full p-2.5 transition-colors duration-500 hocus:bg-accentBase disabled:pointer-events-none disabled:opacity-50 dark:hocus:bg-accentBase dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600';

  return (
    <button
      type={ButtonType.Button}
      onClick={() => handlePageChange(isLeftArrow ? currentPage - 1 : currentPage + 1)}
      disabled={disabledCondition}
      className={buttonStyles}
    >
      <span aria-hidden='true'>
        <SvgIcon
          svgName={IconName.Arrow}
          sizeKey={IconSizes.xsIcon14}
          className={`${iconClass} fill-accentBase group-hover:fill-whiteBase group-focus:fill-whiteBase dark:fill-whiteBase`}
        />
      </span>
      <span className='sr-only'>{label}</span>
    </button>
  );
};

export default ArrowButtonPagination;
