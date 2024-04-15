import React, { FC } from 'react';

import { usePaginationContext, useWindowWidthContext } from 'contexts';
import { VariantButton } from 'types';

import { PrimaryButton } from 'ui';

interface DirectionButtonProps {
  direction: string;
  pageNumbers?: number[];
  handlePrevClick?: () => void;
  handleNextClick?: () => void;
}

const DirectionButton: FC<DirectionButtonProps> = ({
  direction,
  pageNumbers,
  handlePrevClick,
  handleNextClick,
}) => {
  const { isNotMobile } = useWindowWidthContext();
  const { currentPage } = usePaginationContext();

  const disabledPrevButton = currentPage - 1 === 0 ? true : false;
  const disableNextButton = currentPage === pageNumbers?.length ? true : false;

  const getDirectionText = (): JSX.Element | null => {
    return isNotMobile ? (
      <span className='text-base font-medium text-contrastWhite md:text-medium hg:text-xl'>
        {direction}
      </span>
    ) : null;
  };

  return (
    <PrimaryButton
      id={`${direction} page button`}
      variant={VariantButton.Other}
      onHandleClick={direction === 'Prev' ? handlePrevClick : handleNextClick}
      width='w-32'
      disabled={direction === 'Prev' ? disabledPrevButton : disableNextButton}
      hasIcon={true}
      svgName='arrow'
      svgSize='xsIcon14'
      classNameIcon={`${direction === 'Prev' ? 'rotate-90' : '-rotate-90'} fill-whiteBase`}
      classNameButton={direction === 'Prev' ? 'flex-row-reverse' : ''}
    >
      {getDirectionText()}
    </PrimaryButton>
  );
};

export default DirectionButton;
