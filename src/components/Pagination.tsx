import { useWindowWidth } from 'hooks/useWindowWidth';
import React from 'react';
import { PrimaryButton, SvgIcon } from 'ui';
interface P {
  pageNumbers: number[];
  currentPage: number;
  setCurrentPage: (number: number) => void;
}

const Pagination: React.FC<P> = ({ pageNumbers, currentPage, setCurrentPage }) => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  const totalPages = pageNumbers.length;
  const screenHeight = window.innerHeight;
  let visibleButtonsCount: number = 0;

  if (breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile) {
    visibleButtonsCount = 3;
  } else {
    visibleButtonsCount = 6;
  }

  const paginationButtons = [];

  const firstPage = 1;
  const lastPage = totalPages;
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const renderPaginationButton = (pageNumber: number) => (
    <li
      key={pageNumber}
      className={`${pageNumber === currentPage ? 'active' : ''}`}
      onClick={() => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0 + screenHeight, left: 0 });
      }}
    >
      <button
        type='button'
        className={`w-10 h-10 border border-solid border-accentBase  rounded-[10px] text-base md:text-medium font-medium ${
          pageNumber === currentPage
            ? 'bg-accentBase text-contrastWhite'
            : 'text-darkBase dark:text-whiteBase dark:border-whiteBase'
        }`}
      >
        {pageNumber}
      </button>
    </li>
  );

  const renderEllipsis = (direction: string) => (
    <li key={direction} className='ellipsis'>
      <span className='text-darkBase dark:text-whiteBase'>...</span>
    </li>
  );

  if (totalPages <= visibleButtonsCount) {
    for (let i = firstPage; i <= lastPage; i += 1) {
      paginationButtons.push(renderPaginationButton(i));
    }
  } else if (currentPage === firstPage) {
    paginationButtons.push(renderPaginationButton(currentPage));
    paginationButtons.push(renderPaginationButton(nextPage));
    paginationButtons.push(renderEllipsis('next'));
    paginationButtons.push(renderPaginationButton(lastPage));
  } else if (currentPage === lastPage) {
    paginationButtons.push(renderPaginationButton(firstPage));
    paginationButtons.push(renderEllipsis('prev'));
    paginationButtons.push(renderPaginationButton(prevPage));
    paginationButtons.push(renderPaginationButton(currentPage));
  } else if (currentPage > firstPage && currentPage < lastPage) {
    if (currentPage === 2) {
      paginationButtons.push(renderEllipsis('prev'));
      paginationButtons.push(renderPaginationButton(currentPage));
      paginationButtons.push(renderPaginationButton(nextPage));
      paginationButtons.push(renderEllipsis('next'));
      paginationButtons.push(renderPaginationButton(lastPage));
    }
    if (currentPage - 1 > firstPage && currentPage + 1 !== lastPage) {
      paginationButtons.push(renderEllipsis('prev'));
      paginationButtons.push(renderPaginationButton(prevPage));
      paginationButtons.push(renderPaginationButton(currentPage));
      paginationButtons.push(renderEllipsis('next'));
      paginationButtons.push(renderPaginationButton(lastPage));
    }
    if (currentPage + 1 === lastPage) {
      paginationButtons.push(renderPaginationButton(firstPage));
      paginationButtons.push(renderEllipsis('prev'));
      paginationButtons.push(renderPaginationButton(currentPage));
      paginationButtons.push(renderPaginationButton(lastPage));
    }
  }

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0 + screenHeight, left: 0 });
    }
  };

  const handleNextClick = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0 + screenHeight, left: 0 });
    }
  };

  return (
    <div className='flex justify-center items-center gap-2'>
      <PrimaryButton
        buttonData={{ type: 'button' }}
        variant='OtherButton'
        onHandleClick={handlePrevClick}
      >
        <SvgIcon svgName='icon-arrow-left' size={20} className='fill-whiteBase' />
        {breakpointsForMarkup?.isTablet || breakpointsForMarkup?.isDesktop ? (
          <span className='text-base md:text-medium font-medium text-contrastWhite'>Prev</span>
        ) : null}
      </PrimaryButton>
      <ul id='page-numbers' className='flex gap-2'>
        {paginationButtons}
      </ul>
      <PrimaryButton
        buttonData={{ type: 'button' }}
        variant='OtherButton'
        onHandleClick={handleNextClick}
      >
        {breakpointsForMarkup?.isTablet || breakpointsForMarkup?.isDesktop ? (
          <span className='text-base md:text-medium font-medium text-contrastWhite'>Next</span>
        ) : null}

        <SvgIcon svgName='icon-arrow-right' size={20} className='stroke-whiteBase' />
      </PrimaryButton>
    </div>
  );
};

export default Pagination;
