import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { useActiveLinks, useWindowWidth } from 'hooks';

import { Dropdown, PrimaryButton, UnverifiableInput } from 'ui';

import Calendar from '../Calendar/Calendar';
// import { ControlButtons, FilterInputs } from './subcomponents';
import { materialTypes } from './assistants';
import { useFilterNews } from './hooks';
import { ClickHandler } from 'ui/PrimaryButton';

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

const FiltersBlock: FC<{}> = () => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  const {
    filters,
    handleChangeFilter,
    handleMaterialTypeChange,
    handleFiltration,
    handleSort,
    handleReset,
  } = useFilterNews({ activeLinks });

  const filterInputs = [
    {
      name: 'keyword',
      value: filters.keyword,
      placeholder: 'Keyword',
    },
    {
      name: 'author',
      value: filters.author,
      placeholder: 'Author',
    },
    {
      name: 'title',
      value: filters.title,
      placeholder: 'Title',
    },
    {
      name: 'publisher',
      value: filters.publisher,
      placeholder: 'Publisher',
    },
  ];

  const hasFilterValue = Object.values(filters).some((entry) => entry !== '');

  const controlButtons: IControlButtons[] = [
    {
      type: 'submit',
      id: 'Filters submit button',
      variant: 'Primary',
      onHandleClick: hasFilterValue ? handleFiltration : () => console.log('No content'), // Змінити - рендерити PlugImage
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
    <form className='p-3.5 max-md:space-y-4 md:grid md:grid-cols-9 md:grid-rows-3 md:gap-3.5 lg:grid-cols-16 lg:grid-rows-2'>
      {/* <FilterInputs /> */}
      {Array.isArray(filterInputs) &&
        filterInputs.map(({ name, value, placeholder }) => (
          <div key={name} className='md:col-span-3 lg:col-span-4'>
            <UnverifiableInput
              inputData={{
                name,
                type: 'text',
                value,
                placeholder,
              }}
              svgName='icon-search'
              hasIcon={true}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeFilter(event)}
              variant='filterServiceBlock'
            />
          </div>
        ))}
      <div className='md:col-span-3 lg:col-span-4'>
        <Dropdown labels={materialTypes} getResults={handleMaterialTypeChange}>
          Type
        </Dropdown>
      </div>
      <div className='md:col-span-3 lg:col-span-4'>
        <Calendar variant='FiltersBlock' />
      </div>
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
      {/* <ControlButtons /> */}
    </form>
  );
};

export default FiltersBlock;
