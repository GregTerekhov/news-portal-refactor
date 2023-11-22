import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { MATERIALS_TYPES } from 'constants';
import { useActiveLinks, useFilterNews, useWindowWidth } from 'hooks';

import { Dropdown, PrimaryButton, UnverifiableInput } from 'ui';

import Calendar from './Calendar/Calendar';

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

  return (
    <>
      <form className='p-3.5 max-md:space-y-4 md:grid md:grid-cols-9 md:grid-rows-3 md:gap-3.5 lg:grid-cols-16 lg:grid-rows-2'>
        <div className='md:col-span-3 lg:col-span-4'>
          <UnverifiableInput
            inputData={{
              name: 'keyword',
              type: 'text',
              value: filters.keyword,
              placeholder: 'Keyword',
            }}
            svgName='icon-search'
            hasIcon={true}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeFilter(event)}
            variant='filterServiceBlock'
          />
        </div>
        <div className='md:col-span-3 lg:col-span-4'>
          <UnverifiableInput
            inputData={{
              name: 'author',
              type: 'text',
              value: filters.author,
              placeholder: 'Author',
            }}
            svgName='icon-search'
            hasIcon={true}
            variant='filterServiceBlock'
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeFilter(event)}
          />
        </div>
        <div className='md:col-span-3 lg:col-span-4'>
          <UnverifiableInput
            inputData={{
              name: 'title',
              type: 'text',
              value: filters.title,
              placeholder: 'Title',
            }}
            svgName='icon-search'
            hasIcon={true}
            variant='filterServiceBlock'
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeFilter(event)}
          />
        </div>
        <div className='md:col-span-3 lg:col-span-4'>
          <UnverifiableInput
            inputData={{
              name: 'publisher',
              type: 'text',
              value: filters.publisher,
              placeholder: 'Publisher',
            }}
            svgName='icon-search'
            hasIcon={true}
            variant='filterServiceBlock'
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeFilter(event)}
          />
        </div>
        <div className='md:col-span-3 lg:col-span-4'>
          <Dropdown labels={MATERIALS_TYPES} getResults={handleMaterialTypeChange}>
            Type
          </Dropdown>
        </div>
        <div className='md:col-span-3 lg:col-span-4'>
          <Calendar variant='FiltersBlock' />
        </div>
        {breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? (
          <>
            <div className='flex gap-3.5'>
              <PrimaryButton
                id='Filters submit button'
                buttonData={{ type: 'submit' }}
                variant='Primary'
                onHandleClick={handleFiltration}
              >
                Apply
              </PrimaryButton>
              <PrimaryButton
                aria-label='Ascending sort button'
                classNameButton='border-whiteBase bg-accentBase dark:bg-transparent hover:bg-accentAlt transition-colors duration-500 p-2'
                onHandleClick={() => handleSort('asc')}
                variant='Small'
                dataTooltipTarget='tooltip-sort-asc'
                dataTooltipPlacement='bottom'
                tooltipText='Sort news by ascending'
                hasIcon={true}
                svgName='icon-dateSort-asc'
                svgSize={20}
                classNameIcon='fill-whiteBase'
              />
            </div>
            <div className='flex gap-3.5'>
              <PrimaryButton
                id='Filters reset button'
                buttonData={{ type: 'reset' }}
                hasIcon={true}
                variant='Primary'
                svgName='icon-reset'
                svgSize={16}
                classNameIcon='fill-whiteBase'
                onHandleClick={handleReset}
              >
                Reset
              </PrimaryButton>
              <PrimaryButton
                aria-label='Descending sort button'
                classNameButton='p-2 border-whiteBase bg-accentBase dark:bg-transparent hover:bg-accentAlt transition-colors duration-500'
                onHandleClick={() => handleSort('desc')}
                variant='Small'
                dataTooltipTarget='tooltip-sort-desc'
                dataTooltipPlacement='bottom'
                tooltipText='Sort news by descending'
                hasIcon={true}
                svgName='icon-dateSort-desc'
                svgSize={20}
                classNameIcon='fill-whiteBase'
              />
            </div>
          </>
        ) : (
          <>
            <div className='md:col-span-3 md:flex md:items-center lg:items-end lg:col-span-4'>
              <PrimaryButton
                id='Filters submit button'
                buttonData={{ type: 'submit' }}
                variant='Primary'
                onHandleClick={handleFiltration}
              >
                Apply
              </PrimaryButton>
            </div>
            <div className='md:col-span-3 md:flex md:items-center lg:items-end lg:col-span-2'>
              <PrimaryButton
                id='Filters reset button'
                buttonData={{ type: 'reset' }}
                hasIcon={true}
                variant='Primary'
                svgName='icon-reset'
                svgSize={16}
                classNameIcon='fill-whiteBase'
                onHandleClick={handleReset}
              >
                Reset
              </PrimaryButton>
            </div>
            {breakpointsForMarkup?.isTablet ? (
              <p className='text-darkBase dark:text-whiteBase mb-2 text-base md:flex md:items-center md:justify-end'>
                Sort:
              </p>
            ) : null}
            <div className='md-max-lg:col-start-8 md:flex md:items-center md:justify-end lg:items-end'>
              <PrimaryButton
                aria-label='Ascending sort button'
                classNameButton='border-whiteBase bg-accentBase dark:bg-transparent hover:bg-accentAlt transition-colors duration-500 p-2'
                onHandleClick={() => handleSort('asc')}
                variant='Small'
                dataTooltipTarget='tooltip-sort-asc'
                dataTooltipPlacement='bottom'
                tooltipText='Sort news by ascending'
                hasIcon={true}
                svgName='icon-dateSort-asc'
                svgSize={20}
                classNameIcon='fill-whiteBase'
              />
            </div>
            <div className='md-max-lg:col-start-9 md:flex md:items-center md:justify-start lg:items-end'>
              <PrimaryButton
                aria-label='Descending sort button'
                classNameButton='p-2 border-whiteBase bg-accentBase dark:bg-transparent hover:bg-accentAlt transition-colors duration-500'
                onHandleClick={() => handleSort('desc')}
                variant='Small'
                dataTooltipTarget='tooltip-sort-desc'
                dataTooltipPlacement='bottom'
                tooltipText='Sort news by descending'
                hasIcon={true}
                svgName='icon-dateSort-desc'
                svgSize={20}
                classNameIcon='fill-whiteBase'
              />
            </div>
          </>
        )}
      </form>
    </>
  );
};

export default FiltersBlock;
