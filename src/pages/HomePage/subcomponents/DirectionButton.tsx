import React, { FC } from 'react';

import { IconName, IconSizes, PrimaryButtonId, VariantButton } from 'types';

import { usePaginationContext, useWindowWidthContext } from 'contexts';

import { PrimaryButton } from 'ui';

interface IDirectionButtonProps {
  direction: string;
  pageNumbers?: number[];
  handlePrevClick?: () => void;
  handleNextClick?: () => void;
}

const DirectionButton: FC<IDirectionButtonProps> = ({
  direction,
  pageNumbers,
  handlePrevClick,
  handleNextClick,
}) => {
  const { isNotMobile } = useWindowWidthContext();
  const { currentPage } = usePaginationContext();

  const disabledPrevButton = currentPage - 1 === 0;
  const disableNextButton = currentPage === pageNumbers?.length;

  const getDirectionText = (): JSX.Element | null => {
    return isNotMobile ? (
      <span className='text-base font-medium text-contrastWhite md:text-medium hg:text-xl'>
        {direction}
      </span>
    ) : null;
  };

  return (
    <PrimaryButton
      id={direction === 'Prev' ? PrimaryButtonId.PreviousPage : PrimaryButtonId.NextPage}
      variant={VariantButton.Other}
      onHandleClick={direction === 'Prev' ? handlePrevClick : handleNextClick}
      width='w-32'
      disabled={direction === 'Prev' ? disabledPrevButton : disableNextButton}
      hasIcon={true}
      svgName={IconName.Arrow}
      svgSize={IconSizes.xsIcon14}
      classNameIcon={`${direction === 'Prev' ? 'rotate-90' : '-rotate-90'} fill-whiteBase`}
      classNameButton={direction === 'Prev' ? 'flex-row-reverse' : ''}
    >
      {getDirectionText()}
    </PrimaryButton>
  );
};

export default DirectionButton;
