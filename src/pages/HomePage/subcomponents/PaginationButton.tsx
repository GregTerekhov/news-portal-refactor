import React, { FC } from 'react';

import { VariantButton } from 'types';
import { usePaginationContext } from 'contexts';

import { PrimaryButton } from 'ui';

interface PaginationButtonProps {
  pageNumber: number;
  onClick: (pageNumber: number) => void;
}

const PaginationButton: FC<PaginationButtonProps> = ({ pageNumber, onClick }) => {
  const { currentPage } = usePaginationContext();

  const paginationButtonStyles = `h-10 border-accentBase dark:border-whiteBase font-medium transition-colors duration-500 ${
    pageNumber === currentPage
      ? 'bg-accentBase text-contrastWhite hocus:bg-accentAlt'
      : 'text-darkBase dark:text-whiteBase'
  }`;

  return (
    <li key={pageNumber} onClick={() => onClick(pageNumber)}>
      <PrimaryButton
        aria-current='page'
        aria-label={`Page ${pageNumber.toString()} button`}
        classNameButton={`${paginationButtonStyles}`}
        variant={VariantButton.Small}
      >
        {pageNumber}
      </PrimaryButton>
    </li>
  );
};

export default PaginationButton;
