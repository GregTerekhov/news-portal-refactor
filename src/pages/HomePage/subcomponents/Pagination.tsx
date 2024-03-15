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
  const { isNotMobile } = useWindowWidth();

  const renderEllipsis = (direction: string): JSX.Element => (
    <li key={direction} className='text-darkBase dark:text-whiteBase'>
      ...
    </li>
  );

  const handlePageNumberClick = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0 + window.innerHeight, left: 0, behavior: 'smooth' });
  };

  const handlePrevClick = (): void => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0 + window.innerHeight, left: 0, behavior: 'smooth' });
    }
  };

  const handleNextClick = (): void => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0 + window.innerHeight, left: 0, behavior: 'smooth' });
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
      <ul id='page-numbers' className='flex items-center gap-2'>
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
