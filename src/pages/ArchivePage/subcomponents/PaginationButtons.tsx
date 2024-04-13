import React, { FC } from 'react';

import { useWindowWidthContext } from 'contexts';

interface PaginationButtonsProps {
  currentPage: number;
  handlePageChange: (newPage: number) => void;
  totalPages: number;
}

const PaginationButtons: FC<PaginationButtonsProps> = ({
  currentPage,
  handlePageChange,
  totalPages,
}) => {
  const { isMobile } = useWindowWidthContext();

  const renderPaginationButtons = () => {
    const buttons = [];

    const addPageButtons = (start: number, end: number) => {
      for (let i = start; i <= end; i++) {
        buttons.push(
          <button
            key={i}
            type='button'
            aria-current='page'
            className={`${tableButtonStyles} ${
              currentPage === i
                ? 'bg-accentBase text-whiteBase'
                : 'bg-transparent text-darkBase dark:text-whiteBase'
            }`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>,
        );
      }
    };

    const addDots = (direction: string) => {
      buttons.push(
        <span
          key={'dots' + `${direction}`}
          className='flex w-10 items-center justify-center text-darkBase dark:text-whiteBase'
        >
          ...
        </span>,
      );
    };

    if (isMobile) {
      if (totalPages <= 4) {
        addPageButtons(1, totalPages);
      } else if (currentPage === 1) {
        addPageButtons(1, 2);
        addDots('next');
        buttons.push(
          <button
            key={totalPages}
            type='button'
            aria-current='page'
            className={`${tableButtonStyles} ${
              currentPage === totalPages
                ? 'bg-accentBase text-whiteBase'
                : 'bg-transparent text-darkBase dark:text-whiteBase'
            }`}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>,
        );
      } else if (currentPage + 2 === totalPages) {
        addDots('prev');
        addPageButtons(currentPage, totalPages);
      } else if (currentPage + 1 === totalPages) {
        addDots('prev');
        addPageButtons(totalPages - 2, totalPages);
      } else if (currentPage === totalPages) {
        addDots('prev');
        addPageButtons(totalPages - 2, totalPages);
      } else if (currentPage + 2 < totalPages) {
        addDots('prev');
        addPageButtons(currentPage, currentPage);
        addDots('next');
        buttons.push(
          <button
            key={totalPages}
            type='button'
            aria-current='page'
            className={`${tableButtonStyles} ${
              currentPage === totalPages
                ? 'bg-accentBase text-whiteBase'
                : 'bg-transparent text-darkBase dark:text-whiteBase'
            }`}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>,
        );
      }
    } else {
      if (totalPages <= 5) {
        addPageButtons(1, totalPages);
      } else if (currentPage === 1) {
        addPageButtons(1, 3);
        addDots('next');
        buttons.push(
          <button
            key={totalPages}
            type='button'
            aria-current='page'
            className={`${tableButtonStyles} ${
              currentPage === totalPages
                ? 'bg-accentBase text-whiteBase'
                : 'bg-transparent text-darkBase dark:text-whiteBase'
            }`}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>,
        );
      } else if (currentPage + 3 === totalPages) {
        addDots('prev');
        addPageButtons(totalPages - 3, totalPages);
      } else if (currentPage + 2 === totalPages) {
        addDots('prev');
        addPageButtons(totalPages - 3, totalPages);
      } else if (currentPage + 1 === totalPages) {
        addDots('prev');
        addPageButtons(totalPages - 3, totalPages);
      } else if (currentPage === totalPages) {
        addDots('prev');
        addPageButtons(totalPages - 3, totalPages);
      } else if (currentPage + 3 < totalPages) {
        addDots('prev');
        addPageButtons(currentPage, currentPage + 1);
        addDots('next');
        buttons.push(
          <button
            key={totalPages}
            type='button'
            aria-current='page'
            className={`${tableButtonStyles} ${
              currentPage === totalPages
                ? 'bg-accentBase text-whiteBase'
                : 'bg-transparent text-darkBase dark:text-whiteBase'
            }`}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>,
        );
      }
    }

    return buttons;
  };

  const tableButtonStyles =
    'flex w-10 h-10 items-center justify-center rounded-full py-2.5 text-small text-darkBase transition-colors duration-500 hocus:bg-accentBase hocus:text-whiteBase dark:text-whiteBase dark:hocus:bg-accentBase lg:text-medium';

  return <>{renderPaginationButtons()}</>;
};

export default PaginationButtons;
