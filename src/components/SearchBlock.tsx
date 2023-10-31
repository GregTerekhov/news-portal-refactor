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
import { MATERIALS_TYPES } from 'constants';
import { useWindowWidth } from 'hooks';

const SearchBlock = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  const categoriesList = useAppSelector(selectAllCategories);
  const dispatch = useAppDispatch();

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
    <div className='w-full'>
      <button
        className={`flex items-center gap-2 bg-accentBase ${borderRadius} w-full py-1.5 px-6 flex justify-end text-whiteBase font-medium text-medium md:text-2xl`}
        type='button'
        onClick={onClick}
      >
        Additional search
        <SvgIcon
          svgName={showDropdown ? 'icon-arrow-up' : 'icon-arrow-down'}
          size={15}
          className='fill-whiteBase'
        />
      </button>
      {showDropdown && (
        <div className='grid grid-cols-4 grid-rows-5 gap-3.5 md:gap-5 lg:grid-cols-13 lg:grid-rows-3 bg-accentLightForeground p-3.5 rounded-b-xl'>
          <Input
            inputData={{ name: 'author', type: 'text', placeholder: 'Author' }}
            hasIcon={true}
            variant='searchBlock'
            className='col-span-2 lg:col-span-4'
          />
          <Input
            inputData={{ name: 'title', type: 'text', placeholder: 'Title' }}
            hasIcon={true}
            variant='searchBlock'
            className='col-span-2 lg:col-span-4'
          />
          <Input
            inputData={{ name: 'publisher', type: 'text', placeholder: 'Publisher' }}
            hasIcon={true}
            variant='searchBlock'
            className='col-span-2 lg:col-span-4'
          />
          {breakpointsForMarkup?.isDesktop && (
            <div className='flex justify-end md:justify-center'>
              <button
                type='button'
                className='p-2.5 border border-solid border-whiteBase rounded-[10px] bg-accentBase dark:bg-transparent hover:bg-accentAlt transition-colors'
              >
                <SvgIcon svgName='icon-dateSort-asc' size={20} className='fill-whiteBase' />
              </button>
            </div>
          )}
          <div className='col-span-2 lg:col-span-6'>
            <Dropdown labels={MATERIALS_TYPES}>Type</Dropdown>
          </div>
          <div className='col-span-3 lg:col-span-6'>
            <Dropdown labels={categoriesForDropdown} getResults={getNewsByCategory}>
              Categories
            </Dropdown>
          </div>
          <div className='flex justify-end md:justify-center'>
            <button
              type='button'
              className='p-2.5 border border-solid border-whiteBase rounded-[10px] bg-accentBase dark:bg-transparent hover:bg-accentAlt transition-colors'
            >
              <SvgIcon svgName='icon-dateSort-asc' size={20} className='fill-whiteBase' />
            </button>
          </div>
          <div className='col-span-3 lg:col-span-6'>
            <Dropdown labels={['Today', 'Week', 'Month']} getResults={getNewsByPeriod}>
              Time period
            </Dropdown>
          </div>
          {!breakpointsForMarkup?.isDesktop && (
            <div className='flex justify-end md:justify-center'>
              <button
                type='button'
                className='p-2.5 border border-solid border-whiteBase rounded-[10px] bg-accentBase dark:bg-transparent hover:bg-accentAlt transition-colors'
              >
                <SvgIcon svgName='icon-dateSort-desc' size={20} className='fill-whiteBase' />
              </button>
            </div>
          )}
          <div className='col-span-3 lg:col-span-6'>
            <Calendar />
          </div>
          <div className='flex justify-end md:justify-center'>
            <button
              type='button'
              className='p-2.5 border border-solid border-whiteBase rounded-[10px] bg-accentBase dark:bg-transparent hover:bg-accentAlt transition-colors'
            >
              <SvgIcon svgName='icon-relevant' size={20} className='fill-whiteBase' />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBlock;
