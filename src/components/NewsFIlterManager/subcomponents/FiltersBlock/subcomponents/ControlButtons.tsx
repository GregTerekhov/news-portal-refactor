import React, { FC } from 'react';

import { useFiltersAction } from 'reduxStore/hooks';
import { useFiltersState, useWindowWidth } from 'contexts';

import { useActiveLinks } from 'hooks';

import { RenderButtons } from './RenderButtons';

import { getControlButtons, hasNonEmptyValue } from '../assistants';
import { useFilterNews } from '../hooks';

const ControlButtons: FC = () => {
  const { isSorted } = useFiltersAction();
  const { isMobile, isTablet, wideScreens } = useWindowWidth();
  const { filters } = useFiltersState();

  const { isReadActive } = useActiveLinks();
  const { handleFiltration, handleSort, handleReset, handleSortRead } = useFilterNews();

  const hasFilterValue = hasNonEmptyValue(filters);

  const controlButtons = getControlButtons({
    handleFiltration,
    handleSort,
    handleReset,
    handleSortRead,
    isSorted,
    hasFilterValue,
    isReadActive,
    wideScreens,
  });

  const renderHintText = (): JSX.Element => (
    <span className='text-base text-darkBase dark:text-greyAlt lg:text-medium'>Sort:</span>
  );
  return (
    <>
      {isMobile ? (
        <>
          <div className='flex gap-3.5'>{RenderButtons(controlButtons.slice(0, 2))}</div>
          <div className='flex gap-3.5'>{RenderButtons(controlButtons.slice(2))}</div>
        </>
      ) : (
        <>
          <div className='md:col-span-3 md:flex md:items-center lg:col-span-4 lg:items-end'>
            {RenderButtons(controlButtons.slice(0, 1))}
          </div>
          <div className='md:col-span-3 md:flex md:items-center lg:col-span-2 lg:items-end'>
            {RenderButtons(controlButtons.slice(2, 3))}
          </div>
          <div className='md:max-lg:flex md:max-lg:items-center md:max-lg:justify-end'>
            {isTablet && renderHintText()}
          </div>
          <div className='md-max-lg:col-start-8 md:flex md:items-center md:justify-end lg:items-end'>
            <div className='lg:space-y-2'>
              {wideScreens && renderHintText()}
              {RenderButtons([controlButtons[1]])}
            </div>
          </div>
          <div className='md-max-lg:col-start-9 md:flex md:items-center md:justify-start lg:items-end'>
            {RenderButtons([controlButtons[3]])}
          </div>
        </>
      )}
    </>
  );
};

export default ControlButtons;
