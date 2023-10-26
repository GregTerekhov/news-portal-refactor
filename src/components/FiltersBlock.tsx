import React, { useState } from 'react';
import { Dropdown, Input, PrimaryButton, SvgIcon } from 'ui';
import Calendar from './Calendar';

const FiltersBlock = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const onClick: any = () => {
    setShowDropdown(!showDropdown);
  };

  const borderRadius = showDropdown ? 'rounded-t-xl' : 'rounded-xl';

  return (
    <div className='w-1/2'>
      <button
        className={`flex items-center gap-2 bg-accentBase ${borderRadius} w-full py-1.5 px-6 flex justify-end text-whiteBase font-medium text-medium md:text-2xl`}
        type='button'
        onClick={onClick}
      >
        Filters
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
              inputData={{ name: 'keyword', type: 'text', placeholder: 'Keyword' }}
              hasIcon={true}
              variant='searchBlock'
            />
          </div>
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
          <Dropdown labels={['1', '2']}>Type</Dropdown>
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

export default FiltersBlock;
