import React, { useEffect, useState } from 'react';
import { Dropdown, Input, SvgIcon } from 'ui';
import Calendar from './Calendar';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  fetchAllCategories,
  fetchNewsByCategory,
  fetchPopularNews,
  selectAllCategories,
} from 'redux/newsAPI';
import { useLocation } from 'react-router-dom';
import { MATERIALS_TYPES } from 'constants';

const SearchBlock = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const categoriesList = useAppSelector(selectAllCategories);
  const dispatch = useAppDispatch();

  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const onClick = () => {
    setShowDropdown(!showDropdown);
  };

  const getCategoriesList = () => {
    if (categoriesList) {
      const selectedArray = categoriesList.map((item) => item.display_name);

      return selectedArray;
    }
  };

  const categoriesForDropdown = getCategoriesList();

  const getNewsByPeriod = async (period: string) => {
    if (period === 'Today') {
      await dispatch(fetchPopularNews('1'));
    } else if (period === 'Week') {
      await dispatch(fetchPopularNews('7'));
    } else if (period === 'Month') {
      await dispatch(fetchPopularNews('30'));
    }
  };

  const getNewsByCategory = async (section: string) => {
    if (section) {
      await dispatch(fetchNewsByCategory(section));
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
        Additional search
        <SvgIcon
          svgName={showDropdown ? 'icon-arrow-up' : 'icon-arrow-down'}
          size={15}
          className='fill-whiteBase'
        />
      </button>
      {showDropdown && (
        <div className='md:grid md:grid-cols-2 md:grid-rows-4 md:gap-x-3.5 md:gap-y-1.5 lg:grid-cols-3 lg:grid-rows-3 lg:gap-3.5 bg-accentLightForeground p-3.5 rounded-xl'>
          <Input
            inputData={{ name: 'author', type: 'text', placeholder: 'Author' }}
            hasIcon={true}
            variant='searchBlock'
          />
          <Input
            inputData={{ name: 'title', type: 'text', placeholder: 'Title' }}
            hasIcon={true}
            variant='searchBlock'
          />
          <Input
            inputData={{ name: 'publisher', type: 'text', placeholder: 'Publisher' }}
            hasIcon={true}
            variant='searchBlock'
          />
          <Dropdown labels={categoriesForDropdown} getResults={getNewsByCategory}>
            Categories
          </Dropdown>
          <Dropdown labels={MATERIALS_TYPES}>Type</Dropdown>
          {isHomePage && (
            <Dropdown labels={['Today', 'Week', 'Month']} getResults={getNewsByPeriod}>
              Time period
            </Dropdown>
          )}
          <div className='md:col-span-2'>
            <Calendar />
          </div>
          <div className='flex justify-center gap-3.5'>
            <button
              type='button'
              className='p-2.5 border border-solid border-whiteBase rounded-[10px] bg-accentBase dark:bg-transparent hover:bg-accentAlt transition-colors'
            >
              <SvgIcon svgName='icon-dateSort-asc' size={20} className='fill-whiteBase' />
            </button>
            <button
              type='button'
              className='p-2.5 border border-solid border-whiteBase rounded-[10px] bg-accentBase dark:bg-transparent hover:bg-accentAlt transition-colors'
            >
              <SvgIcon svgName='icon-dateSort-desc' size={20} className='fill-whiteBase' />
            </button>
            <button
              type='button'
              className='p-2.5 border border-solid border-whiteBase rounded-[10px] bg-accentBase dark:bg-transparent hover:bg-accentAlt transition-colors'
            >
              <SvgIcon svgName='icon-relevant' size={20} className='fill-whiteBase' />
            </button>
          </div>
          {/* <PrimaryButton
            buttonData={{ type: 'reset' }}
            hasIcon={true}
            variant='SearchBlock'
            svgName='icon-reset'
            svgSize={16}
            className='fill-whiteBase'
          >
            Reset
          </PrimaryButton>
          <div className='md:col-span-2 lg:col-span-3'>
            <PrimaryButton buttonData={{ type: 'submit' }} variant='SearchBlock'>
              Submit
            </PrimaryButton>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default SearchBlock;
