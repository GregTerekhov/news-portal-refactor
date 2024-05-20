import React, { FC } from 'react';

import {
  CalendarVariant,
  DropdownType,
  IconName,
  IconSizes,
  InputName,
  InputType,
  ButtonType,
  VariantButton,
  VariantsPlaceholder,
  PrimaryButtonId,
} from 'types';

import { periods } from 'constants/dropdownArrays';
import { useAdditionRequestContext, useWindowWidthContext } from 'contexts';

import { Dropdown, PrimaryButton, UnverifiableInput } from 'ui';
import Calendar from './Calendar/Calendar';

import { useAdditionalRequest } from './hooks';

const SearchBlock: FC = () => {
  const { isWideScreens } = useWindowWidthContext();
  const { searchParams, hasRequestValue, updateSearchParams } = useAdditionRequestContext();

  const {
    categoriesForDropdown,
    onChangeInput,
    onHandleSearch,
    getNewsByCategory,
    getNewsByPeriod,
    handleResetRequests,
  } = useAdditionalRequest();

  const { query, category, period } = searchParams;

  return (
    <div className='relative p-3.5 after:block after:h-px after:w-full after:bg-fullDark/[.2] after:content-[""] after:dark:bg-whiteBase/[.2] max-md:space-y-4 max-md:after:mt-4 md:grid md:grid-cols-6 md:grid-rows-2 md:gap-4 md:after:col-span-full lg:grid-cols-13 lg:grid-rows-1 lg:gap-x-6'>
      <form
        onSubmit={(e) => onHandleSearch(e)}
        className='max-md:overflow-hidden md:col-span-2 lg:col-span-3'
      >
        <UnverifiableInput
          inputData={{
            name: InputName.Query,
            type: InputType.Text,
            value: query,
            placeholder: VariantsPlaceholder.RequestByKeyword,
          }}
          svgName={IconName.Search}
          hasIcon={true}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeInput(event)}
        />
      </form>
      <div className='md:col-span-2 lg:col-span-3'>
        <Dropdown
          options={categoriesForDropdown}
          getResults={getNewsByCategory}
          selectedItem={category}
          onSelectItem={updateSearchParams}
          label={DropdownType.Category}
        />
      </div>
      <div className='md:col-span-2 lg:col-span-3'>
        <Dropdown
          options={periods}
          getResults={getNewsByPeriod}
          selectedItem={period}
          onSelectItem={updateSearchParams}
          label={DropdownType.Period}
        />
      </div>

      <div className='md:col-span-3 lg:col-span-3'>
        <Calendar variant={CalendarVariant.Search} />
      </div>
      <div className='md:col-span-3 md:mt-auto lg:col-span-1 lg:space-y-2'>
        {isWideScreens ? (
          <p className='text-base text-darkBase dark:text-whiteBase lg:text-medium'>Reset</p>
        ) : null}
        <PrimaryButton
          id={PrimaryButtonId.ResetRequest}
          type={ButtonType.Submit}
          hasIcon={true}
          variant={VariantButton.Primary}
          svgName={IconName.Reset}
          svgSize={isWideScreens ? IconSizes.smIcon21 : IconSizes.xsIcon16}
          classNameIcon='fill-whiteBase'
          classNameButton='py-3'
          onHandleClick={handleResetRequests}
          disabled={!hasRequestValue}
        >
          {isWideScreens ? '' : 'Reset all requests'}
        </PrimaryButton>
      </div>
    </div>
  );
};

export default SearchBlock;
