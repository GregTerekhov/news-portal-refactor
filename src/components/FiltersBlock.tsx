import React, { FC } from 'react';
import { Dropdown, Input, PrimaryButton, SvgIcon } from 'ui';
import Calendar from './Calendar';
import { useWindowWidth } from 'hooks';

type FiltersBlockProps = {
  filters: {
    keyword: string;
    title: string;
    author: string;
    publisher: string;
    materialType: string;
  };
  materialTypes: string[] | undefined;
  handleChangeFilter: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeType: (selectedType: string) => void;
  handleFiltration: (event: React.FormEvent) => void;
  handleSort: (order: string) => void;
  handleResetFilters: () => void;
};

const FiltersBlock: FC<FiltersBlockProps> = ({
  filters,
  materialTypes,
  handleChangeFilter,
  handleChangeType,
  handleFiltration,
  handleSort,
  handleResetFilters,
}) => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };

  return (
    <form className='p-3.5 max-md:space-y-4 md:grid md:grid-cols-9 md:grid-rows-3 md:gap-3.5 lg:grid-cols-16 lg:grid-rows-2'>
      <div className='md:col-span-3 lg:col-span-4'>
        <Input
          inputData={{
            name: 'keyword',
            type: 'text',
            value: filters.keyword,
            placeholder: 'Keyword',
          }}
          hasIcon={true}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeFilter(event)}
          variant='searchBlock'
        />
      </div>
      <div className='md:col-span-3 lg:col-span-4'>
        <Input
          inputData={{
            name: 'author',
            type: 'text',
            value: filters.author,
            placeholder: 'Author',
          }}
          hasIcon={true}
          variant='searchBlock'
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeFilter(event)}
        />
      </div>
      <div className='md:col-span-3 lg:col-span-4'>
        <Input
          inputData={{
            name: 'title',
            type: 'text',
            value: filters.title,
            placeholder: 'Title',
          }}
          hasIcon={true}
          variant='searchBlock'
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeFilter(event)}
        />
      </div>
      <div className='md:col-span-3 lg:col-span-4'>
        <Input
          inputData={{
            name: 'publisher',
            type: 'text',
            value: filters.publisher,
            placeholder: 'Publisher',
          }}
          hasIcon={true}
          variant='searchBlock'
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeFilter(event)}
        />
      </div>
      <div className='md:col-span-3 lg:col-span-4'>
        <Dropdown labels={materialTypes} getResults={handleChangeType}>
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
              variant='SearchBlock'
              onHandleClick={handleFiltration}
            >
              Submit
            </PrimaryButton>
            <button
              aria-label='Ascending sort button'
              type='button'
              className='p-2.5 border border-solid border-whiteBase rounded-[10px] bg-accentBase dark:bg-transparent hover:bg-accentAlt transition-colors'
              onClick={() => handleSort('asc')}
            >
              <SvgIcon svgName='icon-dateSort-asc' size={20} className='fill-whiteBase' />
            </button>
          </div>
          <div className='flex gap-3.5'>
            <PrimaryButton
              id='Filters reset button'
              buttonData={{ type: 'reset' }}
              hasIcon={true}
              variant='SearchBlock'
              svgName='icon-reset'
              svgSize={16}
              className='fill-whiteBase'
              onHandleClick={handleResetFilters}
            >
              Reset
            </PrimaryButton>
            <button
              aria-label='Descending sort button'
              type='button'
              className='p-2.5 border border-solid border-whiteBase rounded-[10px] bg-accentBase dark:bg-transparent hover:bg-accentAlt transition-colors'
              onClick={() => handleSort('desc')}
            >
              <SvgIcon svgName='icon-dateSort-desc' size={20} className='fill-whiteBase' />
            </button>
          </div>
        </>
      ) : (
        <>
          <div className='md:col-span-3 md:flex md:items-center lg:items-end lg:col-span-4'>
            <PrimaryButton
              id='Filters submit button'
              buttonData={{ type: 'submit' }}
              variant='SearchBlock'
              onHandleClick={handleFiltration}
            >
              Submit
            </PrimaryButton>
          </div>
          <div className='md:col-span-3 md:flex md:items-center lg:items-end lg:col-span-2'>
            <PrimaryButton
              id='Filters reset button'
              buttonData={{ type: 'reset' }}
              hasIcon={true}
              variant='SearchBlock'
              svgName='icon-reset'
              svgSize={16}
              className='fill-whiteBase'
              onHandleClick={handleResetFilters}
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
            <button
              aria-label='Ascending sort button'
              type='button'
              className='p-2.5 border border-solid border-whiteBase rounded-[10px] bg-accentBase dark:bg-transparent hover:bg-accentAlt transition-colors'
              onClick={() => handleSort('asc')}
            >
              <SvgIcon svgName='icon-dateSort-asc' size={20} className='fill-whiteBase' />
            </button>
          </div>
          <div className='md-max-lg:col-start-9 md:flex md:items-center md:justify-start lg:items-end'>
            <button
              aria-label='Descending sort button'
              type='button'
              className='p-2.5 border border-solid border-whiteBase rounded-[10px] bg-accentBase dark:bg-transparent hover:bg-accentAlt transition-colors'
              onClick={() => handleSort('desc')}
            >
              <SvgIcon svgName='icon-dateSort-desc' size={20} className='fill-whiteBase' />
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default FiltersBlock;
