import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { useWindowWidth } from 'contexts';
import { useActiveLinks } from 'hooks';

import { PrimaryButton } from 'ui';
import { ClickHandler } from 'ui/PrimaryButton';

import { useFilterNews } from '../hooks';

type ButtonType = 'submit' | 'reset' | 'button';

interface IControlButtons {
  type: ButtonType;
  id?: string | undefined;
  variant: string;
  onHandleClick: ClickHandler;
  ariaLabel?: string | undefined;
  classNameButtons?: string | undefined;
  hasIcon: boolean;
  svgName?: string;
  svgSize: number;
  classNameIcon?: string | undefined;
  children?: string;
}

const ControlButtons: FC = () => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };

  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  const { handleFiltration, handleSort, handleReset } = useFilterNews({ activeLinks });

  const controlButtons: IControlButtons[] = [
    {
      type: 'submit',
      id: 'Filters submit button',
      variant: 'Primary',
      onHandleClick: handleFiltration,
      ariaLabel: '',
      classNameButtons: '',
      hasIcon: false,
      svgName: '',
      svgSize: 0,
      classNameIcon: '',
      children: 'Apply',
    },
    {
      type: 'button',
      id: '',
      variant: 'Small',
      onHandleClick: () => handleSort('asc'),
      ariaLabel: 'Ascending sort button',
      classNameButtons:
        'border-whiteBase bg-accentBase dark:bg-transparent hover:bg-accentAlt transition-colors duration-500 p-2',
      hasIcon: true,
      svgName: 'icon-dateSort-asc',
      svgSize: 20,
      classNameIcon: 'fill-whiteBase',
      children: '',
    },
    {
      type: 'reset',
      id: 'Filters reset button',
      variant: 'Primary',
      onHandleClick: handleReset,
      ariaLabel: '',
      classNameButtons: '',
      hasIcon: true,
      svgName: 'icon-reset',
      svgSize: 16,
      classNameIcon: 'fill-whiteBase',
      children: 'Reset',
    },
    {
      type: 'button',
      id: '',
      variant: 'Small',
      onHandleClick: () => handleSort('desc'),
      ariaLabel: 'Descending sort button',
      classNameButtons:
        'p-2 border-whiteBase bg-accentBase dark:bg-transparent hover:bg-accentAlt transition-colors duration-500',
      hasIcon: true,
      svgName: 'icon-dateSort-asc',
      svgSize: 20,
      classNameIcon: 'fill-whiteBase rotate-180',
      children: '',
    },
  ];

  const renderButtons = (buttons: IControlButtons[]) => (
    <>
      {Array.isArray(buttons) &&
        buttons.map(
          (
            {
              type,
              id,
              variant,
              onHandleClick,
              ariaLabel,
              classNameButtons,
              hasIcon,
              svgName,
              svgSize,
              classNameIcon,
              children,
            },
            index,
          ) => (
            <React.Fragment key={index}>
              <PrimaryButton
                buttonData={{ type: type }}
                id={id}
                variant={variant}
                onHandleClick={onHandleClick}
                ariaLabel={ariaLabel}
                classNameButton={classNameButtons}
                hasIcon={hasIcon}
                svgName={svgName}
                svgSize={svgSize}
                classNameIcon={classNameIcon}
              >
                {children}
              </PrimaryButton>
            </React.Fragment>
          ),
        )}
    </>
  );

  const renderHintText = () => (
    <p className='text-darkBase dark:text-greyAlt mb-2 text-base md:max-lg:flex md:max-lg:items-center md:max-lg:justify-end'>
      Sort:
    </p>
  );
  return (
    <>
      {breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? (
        <>
          <div className='flex gap-3.5'>{renderButtons(controlButtons.slice(0, 2))}</div>
          <div className='flex gap-3.5'>{renderButtons(controlButtons.slice(2))}</div>
        </>
      ) : (
        <>
          <div className='md:col-span-3 md:flex md:items-center lg:items-end lg:col-span-4'>
            {renderButtons(controlButtons.slice(0, 1))}
          </div>
          <div className='md:col-span-3 md:flex md:items-center lg:items-end lg:col-span-2'>
            {renderButtons(controlButtons.slice(2, 3))}
          </div>
          {breakpointsForMarkup?.isTablet && renderHintText()}
          <div className='md-max-lg:col-start-8 md:flex md:items-center md:justify-end lg:items-end'>
            <div>
              {breakpointsForMarkup?.isDesktop && renderHintText()}
              {renderButtons([controlButtons[1]])}
            </div>
          </div>
          <div className='md-max-lg:col-start-9 md:flex md:items-center md:justify-start lg:items-end'>
            {renderButtons([controlButtons[3]])}
          </div>
        </>
      )}
    </>
  );
};

export default ControlButtons;
