import React, { FC } from 'react';

import { useWindowWidth } from 'contexts';

import DirectionButton from './DirectionButton';
import PaginationButton from './PaginationButton';
import { renderPagination } from '../assistants';
interface PaginationProps {
  pageNumbers: number[];
  currentPage: number;
  setCurrentPage: (number: number) => void;
}

const Pagination: FC<PaginationProps> = ({ pageNumbers, currentPage, setCurrentPage }) => {
  const { breakpointsForMarkup } = useWindowWidth();

  const isNotMobile =
    breakpointsForMarkup?.isTablet || breakpointsForMarkup?.isDesktop || breakpointsForMarkup?.isTV;

  const scroll = window.scrollTo({ top: 0 + window.innerHeight, left: 0, behavior: 'smooth' });

  const renderEllipsis = (direction: string): JSX.Element => (
    <li key={direction} className='ellipsis'>
      <span className='text-darkBase dark:text-whiteBase'>...</span>
    </li>
  );

  const handlePageNumberClick = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
    scroll;
  };

  const handlePrevClick = (): void => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      scroll;
    }
  };

  const handleNextClick = (): void => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
      scroll;
    }
  };

  const renderPaginationButton = (pageNumber: number): JSX.Element => (
    <PaginationButton
      pageNumber={pageNumber}
      currentPage={currentPage}
      onClick={handlePageNumberClick}
    />
  );

  const paginationButtons = renderPagination(
    currentPage,
    pageNumbers,
    isNotMobile,
    renderPaginationButton,
    renderEllipsis,
  );

  const renderedPaginationButtons = paginationButtons.map((button, index) => (
    <React.Fragment key={index}>{button}</React.Fragment>
  ));

  return (
    <div className='flex items-center justify-center gap-2'>
      <DirectionButton
        direction='Prev'
        currentPage={currentPage}
        handlePrevClick={handlePrevClick}
      />
      <ul id='page-numbers' className='flex gap-2'>
        {renderedPaginationButtons}
      </ul>
      <DirectionButton
        direction='Next'
        pageNumbers={pageNumbers}
        currentPage={currentPage}
        handleNextClick={handleNextClick}
      />
    </div>
  );
};

export default Pagination;
