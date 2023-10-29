import React, { useState } from 'react';
import { Dropdown, Input, PrimaryButton, SvgIcon } from 'ui';
import Calendar from './Calendar';
import { useAppDispatch } from 'redux/hooks';
import { fetchPopularNews } from 'redux/newsAPI';
import { useLocation } from 'react-router-dom';

import { categoriesList } from 'helpers/categoriesList';

const SearchBlock = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('Today');

  const dispatch = useAppDispatch();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const onClick: any = () => {
    setShowDropdown(!showDropdown);
  };

  const getNewsByPeriod = async (period: string) => {
    setSelectedPeriod(period);
    console.log(`Selected Period: ${period}`);

    if (selectedPeriod === 'Today') {
      console.log('Today');
      await dispatch(fetchPopularNews('1'));
    } else if (selectedPeriod === 'Week') {
      console.log('Week');

      await dispatch(fetchPopularNews('7'));
    } else if (selectedPeriod === 'Month') {
      console.log('Month');

      await dispatch(fetchPopularNews('30'));
    }
  };

  const borderRadius = showDropdown ? 'rounded-t-xl' : 'rounded-xl';

  return (
    <div className='w-1/2'>
      <button
        className={`flex items-center gap-2 bg-accentBase ${borderRadius} w-full py-1.5 px-6 flex justify-end text-whiteBase font-medium text-medium md:text-2xl`}
        type='button'
        onClick={onClick}
      >
        {' '}
        Search
        <SvgIcon
          svgName={showDropdown ? 'icon-arrow-up' : 'icon-arrow-down'}
          size={15}
          className='fill-whiteBase'
        />
      </button>
      {showDropdown && (
        <form className='md:grid md:grid-cols-2 md:grid-rows-5 md:gap-x-3.5 md:gap-y-1.5 lg:grid-cols-3 lg:grid-rows-4 lg:gap-3.5 bg-accentLightForeground p-3.5 rounded-xl'>
          <div>
            <Input
              inputData={{ name: 'author', type: 'text', placeholder: 'Author' }}
              hasIcon={true}
              variant='searchBlock'
            />
          </div>
          <div>
            <Input
              inputData={{ name: 'title', type: 'text', placeholder: 'Title' }}
              hasIcon={true}
              variant='searchBlock'
            />
          </div>
          <Dropdown labels={categoriesList}>Categories</Dropdown>
          <Dropdown labels={['1', '2']}>Type</Dropdown>
          {isHomePage && (
            <Dropdown labels={['Today', 'Week', 'Month']} getResults={getNewsByPeriod}>
              Time period
            </Dropdown>
          )}
          <Dropdown labels={['1', '2']}>Edition</Dropdown>
          <Calendar />
          <PrimaryButton buttonData={{ type: 'reset' }} hasIcon={true} variant='SearchBlock'>
            Reset
          </PrimaryButton>
          <div className='md:col-span-2 lg:col-span-3'>
            <PrimaryButton buttonData={{ type: 'submit' }} variant='SearchBlock'>
              Submit
            </PrimaryButton>
          </div>
        </form>
      )}
    </div>
  );
};

export default SearchBlock;
