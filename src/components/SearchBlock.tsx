import React, { useState } from 'react';
import { Dropdown, Input, PrimaryButton, SvgIcon } from 'ui';
import Calendar from './Calendar';

const SearchBlock = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const onClick: any = () => {
    setShowDropdown(!showDropdown);
  };

  const borderRadius = showDropdown ? 'rounded-t-xl' : 'rounded-xl';

  return (
    <div className='mb-10 md:mb-12 lg:mb-[60px] w-1/2'>
      <button
        className={`bg-accentForeground ${borderRadius} w-full py-1.5 px-6 flex justify-end`}
        type='button'
        onClick={onClick}
      >
        <SvgIcon
          svgName={showDropdown ? 'icon-arrow-up' : 'icon-arrow-down'}
          size={15}
          className='fill-whiteBase'
        />
      </button>
      {showDropdown && (
        <form className='md:grid md:grid-cols-2 md:grid-rows-5 md:gap-x-3.5 md:gap-y-1.5 lg:grid-cols-3 lg:grid-rows-4 lg:gap-3.5 bg-accentForeground p-3.5 rounded-xl'>
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
          <Dropdown>Categories</Dropdown>
          <Dropdown>Type</Dropdown>
          <Dropdown>Time period</Dropdown>
          <Dropdown>Edition</Dropdown>
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
