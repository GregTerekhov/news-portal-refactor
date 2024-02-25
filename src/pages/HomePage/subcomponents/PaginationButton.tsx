import React, { FC } from 'react';

import { VariantButton } from 'types';

import { PrimaryButton } from 'ui';

interface PaginationButtonProps {
  pageNumber: number;
  currentPage: number;
  setCurrentPage: (number: number) => void;
}

const PaginationButton: FC<PaginationButtonProps> = ({
  pageNumber,
  currentPage,
  setCurrentPage,
}) => {
  const screenHeight = window.innerHeight;

  return (
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
};

export default PaginationButton;
