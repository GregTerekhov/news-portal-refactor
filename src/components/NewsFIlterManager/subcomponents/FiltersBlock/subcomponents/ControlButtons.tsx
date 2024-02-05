import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { useWindowWidth } from 'contexts';
import { useActiveLinks, useFilterNews } from 'hooks';

import { getControlButtons } from '../assistants';
import { RenderButtons } from './RenderButtons';

type ControlButtonsProps = {
  hasFilterValue: boolean | undefined;
};

const ControlButtons: FC<ControlButtonsProps> = ({ hasFilterValue }) => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };

  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  const { handleFiltration, handleSort, handleReset, handleSortRead } = useFilterNews({
    activeLinks,
  });

  const shouldSortAccordeon = activeLinks.isReadActive;

  const controlButtons = getControlButtons({
    handleFiltration,
    handleSort,
    handleReset,
    handleSortRead,
    hasFilterValue,
    shouldSortAccordeon,
  });

  const renderHintText = (): JSX.Element => (
    <p className='mb-2 text-base text-darkBase dark:text-greyAlt md:max-lg:flex md:max-lg:items-center md:max-lg:justify-end'>
      Sort:
    </p>
  );
  return (
    <>
      {breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? (
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
          {breakpointsForMarkup?.isTablet && renderHintText()}
          <div className='md-max-lg:col-start-8 md:flex md:items-center md:justify-end lg:items-end'>
            <div>
              {breakpointsForMarkup?.isDesktop && renderHintText()}
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
