import React, { FC } from 'react';

import { useWindowWidthContext } from 'contexts';

interface PaginationButtonsProps {
  currentPage: number;
  handlePageChange: (newPage: number) => void;
  totalPages: number;
}

const MAXIMUM_MOBILE_BUTTONS_COUNT = 4;
const MAXIMUM_WIDESCREEN_BUTTONS_COUNT = 5;
const MOBILE_REFERENCE_COUNT = 2;
const WIDESCREEN_REFERENCE_COUNT = 3;
const FIRST_PAGE = 1;

const PaginationButtons: FC<PaginationButtonsProps> = ({
  currentPage,
  handlePageChange,
  totalPages,
}) => {
  const { isSmallScreens } = useWindowWidthContext();

  const renderPaginationButtons = (): JSX.Element[] => {
    const buttons: JSX.Element[] = [];

    const getButtonStyles = (currentPage: number, index: number) => {
      return currentPage === index
        ? 'bg-accentBase text-whiteBase'
        : 'bg-transparent text-darkBase dark:text-whiteBase';
    };

    const addPageButtons = (start: number, end: number): void => {
      for (let index = start; index <= end; index += FIRST_PAGE) {
        buttons.push(
          <button
            key={index}
            type='button'
            aria-current='page'
            className={`${tableButtonStyles} ${getButtonStyles(currentPage, index)}`}
            onClick={() => handlePageChange(index)}
          >
            {index}
          </button>,
        );
      }
    };

    const addDots = (direction: string): void => {
      buttons.push(
        <span
          key={`dots ${direction}`}
          className='flex w-10 items-center justify-center text-darkBase dark:text-whiteBase'
        >
          ...
        </span>,
      );
    };

    const addLastPageButton = (): void => {
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

    const isMobileLastPages =
      currentPage + MOBILE_REFERENCE_COUNT === totalPages ||
      currentPage + FIRST_PAGE === totalPages ||
      currentPage === totalPages;

    const isWideScreensLastPages =
      currentPage + WIDESCREEN_REFERENCE_COUNT === totalPages ||
      currentPage + MOBILE_REFERENCE_COUNT === totalPages ||
      currentPage + FIRST_PAGE === totalPages ||
      currentPage === totalPages;

    if (isSmallScreens) {
      if (totalPages <= MAXIMUM_MOBILE_BUTTONS_COUNT) {
        addPageButtons(FIRST_PAGE, totalPages);
      } else if (currentPage === FIRST_PAGE) {
        addPageButtons(FIRST_PAGE, MOBILE_REFERENCE_COUNT);
        addDots('next');
        addLastPageButton();
      } else if (isMobileLastPages) {
        addDots('prev');
        addPageButtons(totalPages - MOBILE_REFERENCE_COUNT, totalPages);
      } else if (currentPage + MOBILE_REFERENCE_COUNT < totalPages) {
        addDots('prev');
        addPageButtons(currentPage, currentPage);
        addDots('next');
        addLastPageButton();
      }
    } else {
      if (totalPages <= MAXIMUM_WIDESCREEN_BUTTONS_COUNT) {
        addPageButtons(FIRST_PAGE, totalPages);
      } else if (currentPage === FIRST_PAGE) {
        addPageButtons(FIRST_PAGE, WIDESCREEN_REFERENCE_COUNT);
        addDots('next');
        addLastPageButton();
      } else if (isWideScreensLastPages) {
        addDots('prev');
        addPageButtons(totalPages - WIDESCREEN_REFERENCE_COUNT, totalPages);
      } else if (currentPage + WIDESCREEN_REFERENCE_COUNT < totalPages) {
        addDots('prev');
        addPageButtons(currentPage, currentPage + FIRST_PAGE);
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
