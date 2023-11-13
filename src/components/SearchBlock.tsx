import React, { FC } from 'react';
import { Dropdown, Input, PrimaryButton } from 'ui';
import Calendar from './Calendar';
import { useWindowWidth } from 'hooks';

interface SearchBlockProps {
  inputQuery: string;
  showPopularNews: boolean;
  categoriesList: string[] | undefined;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  getNewsByCategory: (section: string) => Promise<void>;
  getNewsByPeriod: (period: string) => Promise<void>;
  handleResetRequests: () => void;
}

const SearchBlock: FC<SearchBlockProps> = ({
  inputQuery,
  showPopularNews,
  categoriesList,
  handleInputChange,
  handleSearch,
  getNewsByCategory,
  getNewsByPeriod,
  handleResetRequests,
}) => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };

  const isNotMobile = breakpointsForMarkup?.isTablet || breakpointsForMarkup?.isDesktop;

  return (
    <div className='relative md:grid md:grid-cols-6 md:gap-4 md-grid-rows-2 lg:grid-cols-13 lg:gap-6 p-3.5 after:content-[""] after:block after:w-full after:h-px after:bg-fullDark/[.2] after:dark:bg-whiteBase/[.2] max-md:after:mt-4 md:after:col-span-full max-md:space-y-4'>
      {isNotMobile ? (
        <form
          onSubmit={(e) => handleSearch(e)}
          className='max-md:overflow-hidden md:col-span-2 lg:col-span-3'
        >
          <Input
            inputData={{
              name: 'query',
              type: 'text',
              value: inputQuery,
              placeholder: 'Search |',
            }}
            hasIcon={true}
            variant='filterServiceBlock'
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
          />
        </form>
      ) : null}
      <div className='md:col-span-2 lg:col-span-3'>
        <Dropdown labels={categoriesList || []} getResults={getNewsByCategory}>
          Categories
        </Dropdown>
      </div>
      {showPopularNews ? (
        <div className='md:col-span-2 lg:col-span-3'>
          <Dropdown labels={['Today', 'Week', 'Month']} getResults={getNewsByPeriod}>
            Time period
          </Dropdown>
        </div>
      ) : null}
      <div className='md:col-span-3 lg:col-span-3'>
        <Calendar variant='SearchBlock' />
      </div>
      <div className='md:col-span-3 md:mt-auto lg:col-span-1'>
        {breakpointsForMarkup?.isDesktop ? (
          <p className='text-darkBase dark:text-whiteBase mb-2 text-base'>Reset</p>
        ) : null}
        <PrimaryButton
          id='Reset all requests button'
          buttonData={{ type: 'submit' }}
          hasIcon={true}
          variant='Primary'
          svgName='icon-reset'
          svgSize={16}
          classNameIcon='fill-whiteBase'
          classNameButton='py-3'
          onHandleClick={handleResetRequests}
        >
          {breakpointsForMarkup?.isDesktop ? '' : 'Reset all requests'}
        </PrimaryButton>
      </div>
    </div>
  );
};

export default SearchBlock;
