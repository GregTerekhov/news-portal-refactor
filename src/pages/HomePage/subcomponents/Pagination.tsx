import React, { FC } from 'react';

import { VariantButton } from 'types';
import { ICON_SIZES } from 'constants/iconSizes';
import { useWindowWidth } from 'contexts';

import { PrimaryButton, SvgIcon } from 'ui';

import PaginationButton from './PaginationButton';
import { renderPagination } from '../assistants';
interface PaginationProps {
  pageNumbers: number[];
  currentPage: number;
  setCurrentPage: (number: number) => void;
}

const BUTTON_WIDTH = 'w-32';

const Pagination: FC<PaginationProps> = ({ pageNumbers, currentPage, setCurrentPage }) => {
  const { breakpointsForMarkup } = useWindowWidth();

  const isTabletOrDesktop = breakpointsForMarkup?.isTablet || breakpointsForMarkup?.isDesktop;

  const screenHeight = window.innerHeight;

  const renderPaginationButton = (pageNumber: number): JSX.Element => (
    <PaginationButton
      pageNumber={pageNumber}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    />
  );

  const renderEllipsis = (direction: string): JSX.Element => (
    <li key={direction} className='ellipsis'>
      <span className='text-darkBase dark:text-whiteBase'>...</span>
    </li>
  );

  const paginationButtons = renderPagination(
    currentPage,
    pageNumbers,
    isTabletOrDesktop,
    renderPaginationButton,
    renderEllipsis,
  );

  const renderedPaginationButtons = paginationButtons.map((button, index) => (
    <React.Fragment key={index}>{button}</React.Fragment>
  ));

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
        {renderedPaginationButtons}
      </ul>
      <PrimaryButton
        id='Next page button'
        variant={VariantButton.Other}
        onHandleClick={handleNextClick}
        width={BUTTON_WIDTH}
        disabled={currentPage === pageNumbers.length ? true : false}
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
