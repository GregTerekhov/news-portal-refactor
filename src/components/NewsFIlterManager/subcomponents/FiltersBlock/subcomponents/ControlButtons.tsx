import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { ClickHandler, PrimaryButtonType, VariantButton } from 'types';

import { useWindowWidth } from 'contexts';
import { useActiveLinks, useFilterNews } from 'hooks';

import { PrimaryButton } from 'ui';

interface IControlButtons {
  type: PrimaryButtonType;
  id?: string | undefined;
  variant: VariantButton;
  onHandleClick: ClickHandler;
  ariaLabel?: string | undefined;
  classNameButtons?: string | undefined;
  hasIcon: boolean;
  svgName?: string;
  svgSize: number;
  classNameIcon?: string | undefined;
  children?: string;
  disabled?: boolean;
}

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

  const controlButtons: IControlButtons[] = [
    {
      type: 'submit',
      id: 'Filters submit button',
      variant: VariantButton.Primary,
      onHandleClick: handleFiltration,
      ariaLabel: '',
      classNameButtons: '',
      hasIcon: false,
      svgName: '',
      svgSize: 0,
      classNameIcon: '',
      children: 'Apply',
      disabled: !hasFilterValue ? true : false,
    },
    {
      type: 'button',
      id: '',
      variant: VariantButton.Small,
      onHandleClick: () => {
        if (shouldSortAccordeon) {
          handleSortRead('asc');
        } else {
          handleSort('asc');
        }
      },
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
      variant: VariantButton.Primary,
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
      variant: VariantButton.Small,
      onHandleClick: () => {
        if (shouldSortAccordeon) {
          handleSortRead('desc');
        } else {
          handleSort('desc');
        }
      },
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
              disabled,
            },
            index,
          ) => (
            <React.Fragment key={index}>
              <PrimaryButton
                type={type}
                id={id}
                variant={variant}
                onHandleClick={onHandleClick}
                ariaLabel={ariaLabel}
                classNameButton={classNameButtons}
                hasIcon={hasIcon}
                svgName={svgName}
                svgSize={svgSize}
                classNameIcon={classNameIcon}
                disabled={disabled}
              >
                {children}
              </PrimaryButton>
            </React.Fragment>
          ),
        )}
    </>
  );

  const renderHintText = () => (
    <p className='mb-2 text-base text-darkBase dark:text-greyAlt md:max-lg:flex md:max-lg:items-center md:max-lg:justify-end'>
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
          <div className='md:col-span-3 md:flex md:items-center lg:col-span-4 lg:items-end'>
            {renderButtons(controlButtons.slice(0, 1))}
          </div>
          <div className='md:col-span-3 md:flex md:items-center lg:col-span-2 lg:items-end'>
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
