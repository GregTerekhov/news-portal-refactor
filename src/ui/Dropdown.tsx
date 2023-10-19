import React, { ReactNode, useState } from 'react';
import { Menu } from '@headlessui/react';
import { SvgIcon } from 'ui';

type D = {
  children: ReactNode;
};

const Dropdown = ({ children }: D) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);

  const handleClick = () => {
    setIsOpenDropdown(!isOpenDropdown);
  };
  return (
    <Menu as='div' className='relative'>
      <Menu.Button
        className='flex items-center justify-center gap-2.5 w-full border border-solid border-accentBase rounded-[20px] bg-whiteBase py-2 text-accentBase text-small font-normal group-hover:border-whiteBase group-hover:bg-accentBase group-hover:text-whiteBase transition-colors'
        onClick={handleClick}
      >
        {children}
        <SvgIcon
          svgName={isOpenDropdown ? 'icon-arrow-up' : 'icon-arrow-down'}
          size={14}
          className='fill-accentBase'
        />
        {/* p-3.5 md:px-6 */}
      </Menu.Button>
      <Menu.Items className='absolute w-full flex flex-col bg-dropdownBase rounded-[20px] py-3.5 space-y-3'>
        <Menu.Item>
          {({ active }) => (
            <button
              type='button'
              className={`${
                active ? 'bg-accentBase text-contrastWhite' : 'text-accentBase'
              } text-small tracking-wide py-1.5`}
            >
              Today
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              type='button'
              className={`${
                active ? 'bg-accentBase text-contrastWhite' : 'text-accentBase'
              } text-small tracking-wide py-1.5`}
            >
              Week
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              type='button'
              className={`${
                active ? 'bg-accentBase text-contrastWhite' : 'text-accentBase'
              } text-small tracking-wide py-1.5`}
            >
              Month
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default Dropdown;
