import React, { ReactNode, useState } from 'react';
import { Menu } from '@headlessui/react';
import SvgIcon from './SvgIcon';

type D = {
  children: ReactNode;
  labels: string[];
  getResults: (value: string) => void;
};

const Dropdown = ({ children, labels }: Partial<D>) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);
  // const [selectedValue, setSelectedValue] = useState<string>('');

  const handleOpenClick = () => {
    setIsOpenDropdown(!isOpenDropdown);
  };

  // const handleItemClick = (item: string) => {
  //   // setSelectedValue(item);
  //   // getResults(item);
  //   setIsOpenDropdown(false);
  // };

  return (
    <Menu as='div' className='relative'>
      <Menu.Button
        className='flex items-center justify-center gap-2.5 w-full border border-solid border-accentBase rounded-[20px] bg-whiteBase py-2 text-accentBase text-small font-normal group-hover:border-whiteBase group-hover:bg-accentBase group-hover:text-whiteBase transition-colors'
        onClick={handleOpenClick}
      >
        {children}
        <SvgIcon
          svgName={isOpenDropdown ? 'icon-arrow-up' : 'icon-arrow-down'}
          size={14}
          className='fill-accentBase'
        />
      </Menu.Button>
      <Menu.Items className='absolute z-10 w-full flex flex-col bg-dropdownBase rounded-[20px] py-3.5 space-y-3'>
        {labels?.map((item, index) => (
          <Menu.Item key={index}>
            {({ active }) => (
              <button
                type='button'
                className={`${
                  active ? 'bg-accentBase text-contrastWhite' : 'text-accentBase'
                } text-small tracking-wide py-1.5`}
                // onClick={() => handleItemClick(item)}
              >
                {item}
              </button>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};

export default Dropdown;
