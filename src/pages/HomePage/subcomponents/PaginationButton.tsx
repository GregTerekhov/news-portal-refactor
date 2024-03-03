import React, { FC } from 'react';

import { VariantButton } from 'types';

import { PrimaryButton } from 'ui';

interface PaginationButtonProps {
  pageNumber: number;
  currentPage: number;
  onClick: (pageNumber: number) => void;
}

const PaginationButton: FC<PaginationButtonProps> = ({ pageNumber, currentPage, onClick }) => {
  return (
    <li key={pageNumber} onClick={() => onClick(pageNumber)}>
      <PrimaryButton
        aria-label={`Page ${pageNumber.toString()} button`}
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
