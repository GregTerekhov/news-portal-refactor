import React, { FC } from 'react';

import { ButtonType, PaginationDots } from 'types';

import { useWindowWidthContext } from 'contexts';

interface IPaginationButtonsProps {
  currentPage: number;
  handlePageChange: (newPage: number) => void;
  totalPages: number;
}

const MAXIMUM_MOBILE_BUTTONS_COUNT = 4;
const MAXIMUM_WIDESCREEN_BUTTONS_COUNT = 5;
const MOBILE_REFERENCE_COUNT = 2;
const WIDESCREEN_REFERENCE_COUNT = 3;
const FIRST_PAGE = 1;

const PaginationButtons: FC<IPaginationButtonsProps> = ({
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
            type={ButtonType.Button}
            aria-current='page'
            className={`${tableButtonStyles} ${getButtonStyles(currentPage, index)}`}
            onClick={() => handlePageChange(index)}
          >
            {index}
          </button>,
        );
      }
    };

    const addDots = (direction: PaginationDots): void => {
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
          type={ButtonType.Button}
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

    const isWithinMobilePageLimit = totalPages <= MAXIMUM_MOBILE_BUTTONS_COUNT;
    const isWithinWidescreensPageLimit = totalPages <= MAXIMUM_WIDESCREEN_BUTTONS_COUNT;
    const isFirstPage = currentPage === FIRST_PAGE;
    const isMiddlePagesInRange =
      currentPage + (isSmallScreens ? MOBILE_REFERENCE_COUNT : WIDESCREEN_REFERENCE_COUNT) <
      totalPages;

    switch (true) {
      case isWithinMobilePageLimit || isWithinWidescreensPageLimit:
        addPageButtons(FIRST_PAGE, totalPages);
        break;
      case isFirstPage:
        addPageButtons(
          FIRST_PAGE,
          isSmallScreens ? MOBILE_REFERENCE_COUNT : WIDESCREEN_REFERENCE_COUNT,
        );
        addDots(PaginationDots.Next);
        addLastPageButton();
        break;
      case isMobileLastPages && isSmallScreens:
        addDots(PaginationDots.Previous);
        addPageButtons(totalPages - MOBILE_REFERENCE_COUNT, totalPages);
        break;
      case isWideScreensLastPages && !isSmallScreens:
        addDots(PaginationDots.Previous);
        addPageButtons(totalPages - WIDESCREEN_REFERENCE_COUNT, totalPages);
        break;
      case isMiddlePagesInRange && isSmallScreens:
        addDots(PaginationDots.Previous);
        addPageButtons(currentPage, currentPage + (isSmallScreens ? 0 : FIRST_PAGE));
        addDots(PaginationDots.Next);
        addLastPageButton();
        break;

      default:
        break;
    }

    return buttons;
  };

  const tableButtonStyles =
    'flex w-10 h-10 items-center justify-center rounded-full py-2.5 text-small text-darkBase transition-colors duration-500 hocus:bg-accentBase hocus:text-whiteBase dark:text-whiteBase dark:hocus:bg-accentBase lg:text-medium';

  return <>{renderPaginationButtons()}</>;
};

export default PaginationButtons;
