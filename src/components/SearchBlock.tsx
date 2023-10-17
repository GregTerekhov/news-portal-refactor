import React, { useState } from 'react';
import { Dropdown, Input, PrimaryButton, SvgIcon } from 'ui';
import { V } from 'ui/Input';
import { PB } from 'ui/PrimaryButton';
import { Calendar } from 'components';

const SearchBlock = () => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const onClick: any = () => {
    setShowDropdown(!showDropdown);
  };

  const borderRadius = showDropdown ? 'rounded-t-xl' : 'rounded-xl';

  return (
        <div>
      <button
        className={`bg-accentForeground ${borderRadius} w-full py-1.5 px-6 flex justify-end`}
        type='button'
        onClick={onClick}
      >
        <SvgIcon
          svgName={showDropdown ? 'icon-arrow-up' : 'icon-arrow-down'}
          size={15}
          fill='white'
          stroke='none'
        />
      </button>
      {showDropdown && (
    <form className='grid grid-cols-2 grid-rows-5 gap-x-3.5 gap-y-1.5 md:grid-cols-3 md:grid-rows-4 md:gap-3.5 lg:grid-cols-5 lg:grid-rows-3 bg-accentForeground p-3.5 rounded-xl'>
      <div className='md:col-span-1.5 lg:col-span-2'>
        <Input
          inputData={{ name: 'author', type: 'text', placeholder: 'Author' }}
          hasIcon={true}
          variant={V.SearchBlock}
        />
      </div>
      <div className='md:col-span-1.5 lg:col-span-2'>
        <Input
          inputData={{ name: 'title', type: 'text', placeholder: 'Title' }}
          hasIcon={true}
          variant={V.SearchBlock}
        />
      </div>
      <Dropdown>Categories</Dropdown>
      <Dropdown>Type</Dropdown>
      <Dropdown>Time period</Dropdown>
      <Dropdown>Edition</Dropdown>
      <Calendar />
      <PrimaryButton buttonData={{ type: 'reset' }} hasIcon={true} variant={PB.SearchBlock}>
        Reset
      </PrimaryButton>
      <div className='col-span-2 md:col-span-3'>
        <PrimaryButton buttonData={{ type: 'submit' }} variant={PB.SearchBlock}>
          Submit
        </PrimaryButton>
      </div>
    </form>
      )}
    </div>
  );
};

export default SearchBlock;
