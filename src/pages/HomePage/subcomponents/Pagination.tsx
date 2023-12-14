import React, { FC } from 'react';

import { useWindowWidth } from 'hooks';

import { PrimaryButton, SvgIcon } from 'ui';
interface PaginationProps {
  pageNumbers: number[];
  currentPage: number;
  setCurrentPage: (number: number) => void;
}

const BUTTON_WIDTH = 'w-32';
const ICON_SIZE = 24;

const Pagination: FC<PaginationProps> = ({ pageNumbers, currentPage, setCurrentPage }) => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };

  const isTabletOrDesktop = breakpointsForMarkup?.isTablet || breakpointsForMarkup?.isDesktop;

  const totalPages = pageNumbers.length;
  const screenHeight = window.innerHeight;
  const visibleButtonsCount = !isTabletOrDesktop ? 3 : 6;

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
      <PrimaryButton
        aria-label={pageNumber.toString()}
        classNameButton={`h-10 border-accentBase font-medium transition-colors duration-500 ${
          pageNumber === currentPage
            ? 'bg-accentBase text-contrastWhite'
            : 'text-darkBase dark:text-whiteBase dark:border-whiteBase'
        }`}
        variant='Small'
      >
        {pageNumber}
      </PrimaryButton>
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
        id='Previous page button'
        variant='OtherButton'
        onHandleClick={handlePrevClick}
        width={BUTTON_WIDTH}
        disabled={currentPage - 1 === 0 ? true : false}
      >
        <SvgIcon svgName='icon-arrow-left' size={ICON_SIZE} className='fill-whiteBase' />
        {isTabletOrDesktop ? (
          <span className='text-base md:text-medium font-medium text-contrastWhite'>Prev</span>
        ) : null}
      </PrimaryButton>
      <ul id='page-numbers' className='flex gap-2'>
        {paginationButtons}
      </ul>
      <PrimaryButton
        id='Next page button'
        variant='OtherButton'
        onHandleClick={handleNextClick}
        width={BUTTON_WIDTH}
        disabled={currentPage === lastPage ? true : false}
      >
        {isTabletOrDesktop ? (
          <span className='text-base md:text-medium font-medium text-contrastWhite'>Next</span>
        ) : null}

        <SvgIcon svgName='icon-arrow-left' size={ICON_SIZE} className='fill-whiteBase rotate-180' />
      </PrimaryButton>
    </div>
  );
};

export default Pagination;

// import React, { FC } from 'react';
// import { useWindowWidth } from 'hooks';
// import { PrimaryButton, SvgIcon } from 'ui';

// interface PaginationProps {
//   pageNumbers: number[];
//   currentPage: number;
//   setCurrentPage: (number: number) => void;
// }

// interface Button {
//   label: string | number;
//   value: number;
// }

// const Pagination: FC<PaginationProps> = ({ pageNumbers, currentPage, setCurrentPage }) => {
//   const { breakpointsForMarkup } = useWindowWidth() ?? { breakpointsForMarkup: null };
//   const totalPages = pageNumbers.length;
//   const screenHeight = window.innerHeight;
//   const visibleButtonsCount =
//     breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 3 : 6;

//   const renderPaginationButton = (pageNumber: number) => (
//     <li
//       key={pageNumber}
//       className={`${pageNumber === currentPage ? 'active' : ''}`}
//       onClick={() => {
//         setCurrentPage(pageNumber);
//         window.scrollTo({ top: 0 + screenHeight, left: 0 });
//       }}
//     >
//       <PrimaryButton
//         aria-label={pageNumber.toString()}
//         classNameButton={`h-10 border-accentBase font-medium transition-colors duration-500 ${
//           pageNumber === currentPage
//             ? 'bg-accentBase text-contrastWhite'
//             : 'text-darkBase dark:text-whiteBase dark:border-whiteBase'
//         }`}
//         variant='Small'
//       >
//         {pageNumber}
//       </PrimaryButton>
//     </li>
//   );

//   const renderEllipsis = (direction: string) => (
//     <li key={direction} className='ellipsis'>
//       <span className='text-darkBase dark:text-whiteBase'>...</span>
//     </li>
//   );

//   const renderPaginationButtons = () => {
//     const buttonsToRender =
//       totalPages <= visibleButtonsCount
//         ? getButtonsForRange(1, totalPages)
//         : getPaginationButtons(currentPage, totalPages);

//     return buttonsToRender.map(({ label, value }) => {
//       if (label === 'prev' || label === 'next') {
//         return renderEllipsis(label);
//       } else {
//         return renderPaginationButton(value);
//       }
//     });
//   };

//   const getButtonsForRange = (start: number, end: number): Button[] => {
//     return Array.from({ length: end - start + 1 }, (_, index) => ({
//       label: index + start,
//       value: index + start,
//     }));
//   };

//   const getPaginationButtons = (currentPage: number, totalPages: number): Button[] => {
//     const buttons: Button[] = [
//       { label: 'prev', value: currentPage - 1 },
//       { label: currentPage.toString(), value: currentPage },
//       { label: 'next', value: currentPage + 1 },
//       { label: totalPages.toString(), value: totalPages },
//     ];

//     if (currentPage === 1) {
//       return [...buttons.slice(0, 3), { label: 'next', value: totalPages }];
//     } else if (currentPage === totalPages) {
//       return [{ label: 'prev', value: 1 }, ...buttons.slice(2, 4)];
//     } else if (currentPage === 2) {
//       return [
//         { label: 'prev', value: 1 },
//         ...buttons.slice(1, 3),
//         { label: 'next', value: totalPages },
//       ];
//     } else if (currentPage - 1 > 1 && currentPage + 1 !== totalPages) {
//       return [
//         { label: 'prev', value: 1 },
//         ...buttons.slice(1, 4),
//         { label: 'next', value: totalPages },
//       ];
//     } else if (currentPage + 1 === totalPages) {
//       return [
//         { label: 'prev', value: 1 },
//         ...buttons.slice(1, 3),
//         { label: 'next', value: totalPages },
//       ];
//     } else {
//       return [];
//     }
//   };

//   const handlePrevClick = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//       window.scrollTo({ top: 0 + screenHeight, left: 0 });
//     }
//   };

//   const handleNextClick = () => {
//     if (currentPage < pageNumbers.length) {
//       setCurrentPage(currentPage + 1);
//       window.scrollTo({ top: 0 + screenHeight, left: 0 });
//     }
//   };

//   return (
//     <div className='flex justify-center items-center gap-2'>
//       <PrimaryButton
//         id='Previous page button'
//         variant='OtherButton'
//         onHandleClick={handlePrevClick}
//         width='w-32'
//       >
//         <SvgIcon svgName='icon-arrow-left' size={20} className='fill-whiteBase' />
//         {breakpointsForMarkup?.isTablet || breakpointsForMarkup?.isDesktop ? (
//           <span className='text-base md:text-medium font-medium text-contrastWhite'>Prev</span>
//         ) : null}
//       </PrimaryButton>
//       <ul id='page-numbers' className='flex gap-2'>
//         {renderPaginationButtons()}
//       </ul>
//       <PrimaryButton
//         id='Next page button'
//         variant='OtherButton'
//         onHandleClick={handleNextClick}
//         width='w-32'
//       >
//         {breakpointsForMarkup?.isTablet || breakpointsForMarkup?.isDesktop ? (
//           <span className='text-base md:text-medium font-medium text-contrastWhite'>Next</span>
//         ) : null}
//         <SvgIcon svgName='icon-arrow-left' size={20} className='fill-whiteBase rotate-180' />
//       </PrimaryButton>
//     </div>
//   );
// };

// export default Pagination;
