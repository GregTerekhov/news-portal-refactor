import React, { useState } from 'react';
import { Dropdown, Input, PrimaryButton, SvgIcon } from 'ui';
import { V } from 'ui/Input';
import { PB } from 'ui/PrimaryButton';
import { Calendar } from 'components';

const SearchBlock = () => {
  // const [isOpenCalendar, setIsOpenCalendar] = useState<boolean>(false);

  // const handleClick = () => {
  //   setIsOpenCalendar(!isOpenCalendar);
  // };
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
        <form className='flex flex-wrap gap-x-3.5 gap-y-1.5 items-center justify-center bg-accentForeground py-3.5 rounded-b-xl'>
          <div className='basis-5/12'>
            <Input
              inputData={{ name: 'author', type: 'text', placeholder: 'Author' }}
              hasIcon={true}
              variant={V.SearchBlock}
            />
          </div>

          <div className='basis-5/12'>
            <Input
              inputData={{ name: 'title', type: 'text', placeholder: 'Title' }}
              hasIcon={true}
              variant={V.SearchBlock}
            />
          </div>
          <div className='basis-5/12 group md:basis-1/4'>
            <Dropdown>Categories</Dropdown>
          </div>
          <div className='basis-5/12 group md:basis-1/4'>
            <Dropdown>Type</Dropdown>
          </div>
          <div className='basis-5/12 group md:basis-1/4'>
            <Dropdown>Time period</Dropdown>
          </div>
          <div className='basis-5/12 group md:basis-1/4'>
            <Dropdown>Edition</Dropdown>
          </div>
          <Calendar />
          <div className='basis-4/12 md:basis-1/4'>
            <PrimaryButton buttonData={{ type: 'reset' }} hasIcon={true} variant={PB.SearchBlock}>
              Reset
            </PrimaryButton>
          </div>
          <div className='w-11/12'>
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
