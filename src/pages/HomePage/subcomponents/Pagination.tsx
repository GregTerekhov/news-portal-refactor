import React, { FC } from 'react';

import { VariantButton } from 'types';
import { ICON_SIZES } from 'constants/iconSizes';
import { useWindowWidth } from 'contexts';

import { PrimaryButton, SvgIcon } from 'ui';
interface PaginationProps {
  pageNumbers: number[];
  currentPage: number;
  setCurrentPage: (number: number) => void;
}

const BUTTON_WIDTH = 'w-32';
const FIRST_PAGE = 1;
const DESKTOP_BUTTONS_QUANTITY = 3;
const MOBILE_BUTTONS_QUANTITY = 6;

const Pagination: FC<PaginationProps> = ({ pageNumbers, currentPage, setCurrentPage }) => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };

  const isTabletOrDesktop = breakpointsForMarkup?.isTablet || breakpointsForMarkup?.isDesktop;

  const totalPages = pageNumbers.length;
  const screenHeight = window.innerHeight;
  const visibleButtonsCount = !isTabletOrDesktop
    ? DESKTOP_BUTTONS_QUANTITY
    : MOBILE_BUTTONS_QUANTITY;

  const paginationButtons = [];

  const lastPage = totalPages;
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const renderPaginationButton = (pageNumber: number): JSX.Element => (
    <li
      key={pageNumber}
      className={`${pageNumber === currentPage ? 'active' : ''}`}
      onClick={() => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0 + screenHeight, left: 0 });
      }}
    >
      <PrimaryButton
        aria-label={pageNumber.toString()}
        classNameButton={`h-10 border-accentBase font-medium transition-colors duration-500 ${
          pageNumber === currentPage
            ? 'bg-accentBase text-contrastWhite'
            : 'text-darkBase dark:text-whiteBase dark:border-whiteBase'
        }`}
        variant={VariantButton.Small}
      >
        {pageNumber}
      </PrimaryButton>
    </li>
  );

  const renderEllipsis = (direction: string): JSX.Element => (
    <li key={direction} className='ellipsis'>
      <span className='text-darkBase dark:text-whiteBase'>...</span>
    </li>
  );

  if (totalPages <= visibleButtonsCount) {
    for (let i = FIRST_PAGE; i <= lastPage; i += 1) {
      paginationButtons.push(renderPaginationButton(i));
    }
  } else if (currentPage === FIRST_PAGE) {
    paginationButtons.push(renderPaginationButton(currentPage));
    paginationButtons.push(renderPaginationButton(nextPage));
    paginationButtons.push(renderEllipsis('next'));
    paginationButtons.push(renderPaginationButton(lastPage));
  } else if (currentPage === lastPage) {
    paginationButtons.push(renderPaginationButton(FIRST_PAGE));
    paginationButtons.push(renderEllipsis('prev'));
    paginationButtons.push(renderPaginationButton(prevPage));
    paginationButtons.push(renderPaginationButton(currentPage));
  } else if (currentPage > FIRST_PAGE && currentPage < lastPage) {
    if (currentPage === 2) {
      paginationButtons.push(renderEllipsis('prev'));
      paginationButtons.push(renderPaginationButton(currentPage));
      paginationButtons.push(renderPaginationButton(nextPage));
      paginationButtons.push(renderEllipsis('next'));
      paginationButtons.push(renderPaginationButton(lastPage));
    }
    if (currentPage - 1 > FIRST_PAGE && currentPage + 1 !== lastPage) {
      paginationButtons.push(renderEllipsis('prev'));
      paginationButtons.push(renderPaginationButton(prevPage));
      paginationButtons.push(renderPaginationButton(currentPage));
      paginationButtons.push(renderPaginationButton(nextPage));
      paginationButtons.push(renderEllipsis('next'));
    }
    if (currentPage + 1 === lastPage) {
      paginationButtons.push(renderEllipsis('prev'));
      paginationButtons.push(renderPaginationButton(prevPage));
      paginationButtons.push(renderPaginationButton(currentPage));
      paginationButtons.push(renderPaginationButton(lastPage));
    }
  }

  const handlePrevClick = (): void => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0 + screenHeight, left: 0 });
    }
  };

  const handleNextClick = (): void => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0 + screenHeight, left: 0 });
    }
  };

  return (
    <div className='flex items-center justify-center gap-2'>
      <PrimaryButton
        id='Previous page button'
        variant={VariantButton.Other}
        onHandleClick={handlePrevClick}
        width={BUTTON_WIDTH}
        disabled={currentPage - 1 === 0 ? true : false}
      >
        <SvgIcon
          svgName='icon-arrow'
          size={ICON_SIZES.xsIcon14}
          className='rotate-90 fill-whiteBase'
        />
        {isTabletOrDesktop ? (
          <span className='text-base font-medium text-contrastWhite md:text-medium'>Prev</span>
        ) : null}
      </PrimaryButton>
      <ul id='page-numbers' className='flex gap-2'>
        {paginationButtons}
      </ul>
      <PrimaryButton
        id='Next page button'
        variant={VariantButton.Other}
        onHandleClick={handleNextClick}
        width={BUTTON_WIDTH}
        disabled={currentPage === lastPage ? true : false}
      >
        {isTabletOrDesktop ? (
          <span className='text-base font-medium text-contrastWhite md:text-medium'>Next</span>
        ) : null}

        <SvgIcon
          svgName='icon-arrow'
          size={ICON_SIZES.xsIcon14}
          className='-rotate-90 fill-whiteBase'
        />
      </PrimaryButton>
    </div>
  );
};

export default Pagination;
