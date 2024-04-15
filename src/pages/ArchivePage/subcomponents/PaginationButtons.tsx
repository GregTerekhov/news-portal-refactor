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

  const renderPaginationButtons = (): JSX.Element[] => {
    const buttons: JSX.Element[] = [];

    const getButtonStyles = (currentPage: number, index: number) => {
      return currentPage === index
        ? 'bg-accentBase text-whiteBase'
        : 'bg-transparent text-darkBase dark:text-whiteBase';
    };

    const addPageButtons = (start: number, end: number) => {
      for (let i = start; i <= end; i += 1) {
        buttons.push(
          <button
            key={i}
            type='button'
            aria-current='page'
            className={`${tableButtonStyles} ${getButtonStyles(currentPage, i)}`}
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

    const addLastPageButton = () => {
      buttons.push(
        <button
          key={totalPages}
          type='button'
          aria-current='page'
          className={`${tableButtonStyles} ${getButtonStyles(currentPage, totalPages)}`}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>,
      );
    };

    const mobileLastPages =
      currentPage + 2 === totalPages ||
      currentPage + 1 === totalPages ||
      currentPage === totalPages;

    const wideScreensLastPages =
      currentPage + 3 === totalPages ||
      currentPage + 2 === totalPages ||
      currentPage + 1 === totalPages ||
      currentPage === totalPages;

    if (isMobile) {
      if (totalPages <= 4) {
        addPageButtons(1, totalPages);
      } else if (currentPage === 1) {
        addPageButtons(1, 2);
        addDots('next');
        addLastPageButton();
      } else if (mobileLastPages) {
        addDots('prev');
        addPageButtons(totalPages - 2, totalPages);
      } else if (currentPage + 2 < totalPages) {
        addDots('prev');
        addPageButtons(currentPage, currentPage);
        addDots('next');
        addLastPageButton();
      }
    } else {
      if (totalPages <= 5) {
        addPageButtons(1, totalPages);
      } else if (currentPage === 1) {
        addPageButtons(1, 3);
        addDots('next');
        addLastPageButton();
      } else if (wideScreensLastPages) {
        addDots('prev');
        addPageButtons(totalPages - 3, totalPages);
      } else if (currentPage + 3 < totalPages) {
        addDots('prev');
        addPageButtons(currentPage, currentPage + 1);
        addDots('next');
        addLastPageButton();
      }
    }

    return buttons;
  };

  const tableButtonStyles =
    'flex w-10 h-10 items-center justify-center rounded-full py-2.5 text-small text-darkBase transition-colors duration-500 hocus:bg-accentBase hocus:text-whiteBase dark:text-whiteBase dark:hocus:bg-accentBase lg:text-medium';

  return <>{renderPaginationButtons()}</>;
};

export default PaginationButtons;
