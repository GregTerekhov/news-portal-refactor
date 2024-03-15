import React, { FC } from 'react';

import { VariantButton, VariantInputs } from 'types';
import { ICON_SIZES } from 'constants/iconSizes';
import { useWindowWidth } from 'contexts';
import { useAdditionalRequest } from 'hooks';

import { Dropdown, PrimaryButton, UnverifiableInput } from 'ui';

import Calendar from './Calendar/Calendar';

const SearchBlock: FC<{}> = () => {
  const { isNotMobile, wideScreens } = useWindowWidth();

  const {
    query,
    period,
    category,
    categoriesForDropdown,
    showPopular,
    updateSearchParams,
    onChangeInput,
    onHandleSearch,
    getNewsByCategory,
    getNewsByPeriod,
    handleResetRequests,
  } = useAdditionalRequest();

  return (
    <div className='relative p-3.5 after:block after:h-px after:w-full after:bg-fullDark/[.2] after:content-[""] after:dark:bg-whiteBase/[.2] max-md:space-y-4 max-md:after:mt-4 md:grid md:grid-cols-6 md:grid-rows-2 md:gap-4 md:after:col-span-full lg:grid-cols-13 lg:grid-rows-1 lg:gap-x-6'>
      {isNotMobile ? (
        <form
          onSubmit={(e) => onHandleSearch(e)}
          className='max-md:overflow-hidden md:col-span-2 lg:col-span-3'
        >
          <UnverifiableInput
            inputData={{
              name: 'query',
              type: 'text',
              value: query,
              placeholder: 'Search |',
            }}
            svgName='search'
            hasIcon={true}
            variant={VariantInputs.FilterServiceBlock}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeInput(event)}
          />
        </form>
      ) : null}
      <div className='md:col-span-2 lg:col-span-3'>
        <Dropdown
          options={categoriesForDropdown || []}
          getResults={getNewsByCategory}
          selectedItem={category}
          onSelectItem={updateSearchParams}
          label='Categories'
        />
      </div>
      {showPopular ? (
        <div className='md:col-span-2 lg:col-span-3'>
          <Dropdown
            options={['Today', 'Week', 'Month']}
            getResults={getNewsByPeriod}
            selectedItem={period}
            onSelectItem={updateSearchParams}
            label='Time period'
          />
        </div>
      ) : null}

      <div className='md:col-span-3 lg:col-span-3'>
        <Calendar variant='SearchBlock' />
      </div>
      <div className='md:col-span-3 md:mt-auto lg:col-span-1'>
        {wideScreens ? (
          <p className='mb-2 text-base text-darkBase dark:text-whiteBase lg:text-medium'>Reset</p>
        ) : null}
        <PrimaryButton
          id='Reset all requests button'
          type='submit'
          hasIcon={true}
          variant={VariantButton.Primary}
          svgName='reset'
          svgSize={wideScreens ? ICON_SIZES.smIcon21 : ICON_SIZES.xsIcon16}
          classNameIcon='fill-whiteBase'
          classNameButton='py-3'
          onHandleClick={handleResetRequests}
        >
          {wideScreens ? '' : 'Reset all requests'}
        </PrimaryButton>
      </div>
    </div>
  );
};

export default SearchBlock;
