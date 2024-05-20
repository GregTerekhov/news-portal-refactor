import React, { FC } from 'react';

import { usePaginationContext, useWindowWidthContext } from 'contexts';

import DirectionButton from './DirectionButton';
import PaginationButton from './PaginationButton';

import { renderPagination } from '../assistants';
import { useControls } from '../hooks';
interface IPaginationProps {
  pageNumbers: number[];
}

const Pagination: FC<IPaginationProps> = ({ pageNumbers }) => {
  const { isNotMobile } = useWindowWidthContext();
  const { currentPage, setCurrentPage } = usePaginationContext();

  const { handlePageNumberClick, handleNextClick, handlePrevClick } = useControls(
    setCurrentPage,
    currentPage,
    pageNumbers,
  );

  const renderEllipsis = (direction: string): JSX.Element => (
    <li key={direction} className='text-darkBase dark:text-whiteBase'>
      ...
    </li>
  );

  const renderPaginationButton = (pageNumber: number): JSX.Element => (
    <PaginationButton pageNumber={pageNumber} onClick={handlePageNumberClick} />
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
      <DirectionButton direction='Prev' handlePrevClick={handlePrevClick} />
      <ul id='page-numbers' className='flex items-center gap-2'>
        {renderedPaginationButtons}
      </ul>
      <DirectionButton
        direction='Next'
        pageNumbers={pageNumbers}
        handleNextClick={handleNextClick}
      />
    </div>
  );
};

export default Pagination;
