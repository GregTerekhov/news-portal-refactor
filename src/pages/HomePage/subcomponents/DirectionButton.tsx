import React, { FC } from 'react';

import { ICON_SIZES } from 'constants/iconSizes';
import { useWindowWidth } from 'contexts';
import { VariantButton } from 'types';

import { PrimaryButton } from 'ui';

interface DirectionButtonProps {
  direction: string;
  currentPage: number;
  pageNumbers?: number[];
  handlePrevClick?: () => void;
  handleNextClick?: () => void;
}

const DirectionButton: FC<DirectionButtonProps> = ({
  direction,
  currentPage,
  pageNumbers,
  handlePrevClick,
  handleNextClick,
}) => {
  const { isNotMobile } = useWindowWidth();

  const disabledPrevButton = currentPage - 1 === 0 ? true : false;
  const disableNextButton = currentPage === pageNumbers?.length ? true : false;

  return (
    <PrimaryButton
      id={`${direction} page button`}
      variant={VariantButton.Other}
      onHandleClick={direction === 'Prev' ? handlePrevClick : handleNextClick}
      width='w-32'
      disabled={direction === 'Prev' ? disabledPrevButton : disableNextButton}
      hasIcon={true}
      svgName='icon-arrow'
      svgSize={ICON_SIZES.xsIcon14}
      classNameIcon={`${direction === 'Prev' ? 'rotate-90' : '-rotate-90'}  fill-whiteBase`}
      classNameButton={direction === 'Prev' ? 'flex-row-reverse' : ''}
    >
      {isNotMobile ? (
        <span className='text-base font-medium text-contrastWhite md:text-medium hg:text-xl'>
          {direction}
        </span>
      ) : null}
    </PrimaryButton>
  );
};

export default DirectionButton;
