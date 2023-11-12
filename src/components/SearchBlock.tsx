import React, { FC } from 'react';
import { Dropdown, PrimaryButton } from 'ui';
import Calendar from './Calendar';
import { useWindowWidth } from 'hooks';

interface SearchBlockProps {
  showPopularNews: boolean;
  categoriesList: string[] | undefined;
  getNewsByCategory: (section: string) => Promise<void>;
  getNewsByPeriod: (period: string) => Promise<void>;
  handleResetRequests: () => void;
}

const SearchBlock: FC<SearchBlockProps> = ({
  showPopularNews,
  categoriesList,
  getNewsByCategory,
  getNewsByPeriod,
  handleResetRequests,
}) => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };

  return (
    <div className='relative md:grid md:grid-cols-2 md:gap-4 md-grid-rows-2 lg:grid-cols-7 lg:gap-6 p-3.5 after:content-[""] after:block after:w-full after:h-px after:bg-fullDark/[.2] after:dark:bg-whiteBase/[.2] max-md:after:mt-4 md:after:col-span-full max-md:space-y-4'>
      <div className='lg:col-span-2'>
        <Dropdown labels={categoriesList || []} getResults={getNewsByCategory}>
          Categories
        </Dropdown>
      </div>
      {showPopularNews ? (
        <div className='lg:col-span-2'>
          <Dropdown labels={['Today', 'Week', 'Month']} getResults={getNewsByPeriod}>
            Time period
          </Dropdown>
        </div>
      ) : null}
      <div className='lg:col-span-2'>
        <Calendar variant='SearchBlock' />
      </div>
      <div className='md:mt-auto'>
        <PrimaryButton
          id='Reset all requests button'
          buttonData={{ type: 'submit' }}
          hasIcon={true}
          variant='Primary'
          svgName='icon-reset'
          svgSize={16}
          classNameIcon='fill-whiteBase'
          onHandleClick={handleResetRequests}
        >
          {breakpointsForMarkup?.isDesktop ? 'Reset' : 'Reset all requests'}
        </PrimaryButton>
      </div>
    </div>
  );
};

export default SearchBlock;
