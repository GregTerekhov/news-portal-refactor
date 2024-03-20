import React, { FC } from 'react';

import { useWindowWidth } from 'contexts';

import { useActiveLinks } from 'hooks';

import { RenderButtons } from './RenderButtons';

import { getControlButtons } from '../assistants';
import { useFilterNews } from '../hooks';

type ControlButtonsProps = {
  hasFilterValue: boolean | undefined;
};

const ControlButtons: FC<ControlButtonsProps> = ({ hasFilterValue }) => {
  const { isMobile, isTablet, wideScreens } = useWindowWidth();

  const { isReadActive } = useActiveLinks();
  const { handleFiltration, handleSort, handleReset, handleSortRead } = useFilterNews();

  const controlButtons = getControlButtons({
    handleFiltration,
    handleSort,
    handleReset,
    handleSortRead,
    hasFilterValue,
    isReadActive,
    wideScreens,
  });

  const renderHintText = (): JSX.Element => (
    <p className='text-base text-darkBase dark:text-greyAlt md:max-lg:flex md:max-lg:items-center md:max-lg:justify-end lg:mb-2 lg:text-medium'>
      Sort:
    </p>
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
          {isTablet && renderHintText()}
          <div className='md-max-lg:col-start-8 md:flex md:items-center md:justify-end lg:items-end'>
            <div>
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
