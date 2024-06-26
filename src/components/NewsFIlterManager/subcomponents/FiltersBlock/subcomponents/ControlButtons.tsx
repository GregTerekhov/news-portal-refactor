import React, { FC } from 'react';

import { useFiltersRedux } from 'reduxStore/hooks';
import { useFiltersStateContext, useWindowWidthContext } from 'contexts';

import { RenderButtons } from './RenderButtons';

import { useActiveLinks } from 'hooks';
import { getControlButtons, hasNonEmptyValue } from '../assistants';
import { useFilterNews, useResetFiltration, useSortAccordion, useSortNews } from '../hooks';

const ControlButtons: FC = () => {
  const { isSorted } = useFiltersRedux();
  const { isSmallScreens, isTablet, isWideScreens } = useWindowWidthContext();
  const { filters } = useFiltersStateContext();

  const { isReadActive } = useActiveLinks();
  const { handleFiltration } = useFilterNews();
  const { handleResetFiltration } = useResetFiltration();
  const { handleSortNews } = useSortNews();
  const { handleSortAccordion } = useSortAccordion();

  const hasFilterValue = hasNonEmptyValue(filters);

  const controlButtons = getControlButtons({
    handleFiltration,
    handleSortNews,
    handleResetFiltration,
    handleSortAccordion,
    isSorted,
    hasFilterValue,
    isReadActive,
    isWideScreens,
  });

  const renderHintText = (): JSX.Element => (
    <span className='text-base text-darkBase dark:text-greyAlt lg:text-medium'>Sort:</span>
  );
  return (
    <>
      {isSmallScreens ? (
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
          <div className='md:col-start-8 md:flex md:items-center md:justify-end lg:col-start-[15] lg:row-start-2 lg:items-end'>
            <div className='lg:space-y-2'>
              {isWideScreens && renderHintText()}
              {RenderButtons([controlButtons[1]])}
            </div>
          </div>
          <div className='md:col-start-9 md:flex md:items-center md:justify-start lg:col-start-[16] lg:row-start-2 lg:items-end'>
            {RenderButtons([controlButtons[3]])}
          </div>
        </>
      )}
    </>
  );
};

export default ControlButtons;
