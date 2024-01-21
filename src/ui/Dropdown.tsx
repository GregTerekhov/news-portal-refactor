import React, { FC, ReactNode, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';

import { SearchParamsObject } from 'hooks/useAdditionalRequest';

import SvgIcon from './SvgIcon';
import { CustomScrollBar } from '.';

interface DropdownProps {
  children: ReactNode;
  labels: string[] | undefined;
  getResults: (value: string) => void;
  selectedItem: string;
  onSelectItem: (key: keyof SearchParamsObject | 'type', value: string) => void;
}

const Dropdown: FC<DropdownProps> = ({
  children,
  labels,
  getResults,
  selectedItem,
  onSelectItem,
}) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);

  const handleOpenClick = () => {
    setIsOpenDropdown(!isOpenDropdown);
  };

  const handleItemClick = (item: string) => {
    if (getResults) getResults(item);
    onSelectItem(
      children === 'Category' ? 'category' : children === 'Time period' ? 'period' : 'type',
      item,
    );
    setIsOpenDropdown(false);
  };

  console.log(children);

  return (
    <Menu as='div' className='relative'>
      {({ open }) => (
        <>
          <p className='text-darkBase dark:text-greyAlt mb-2 text-base'>
            {children === 'Type' ? 'Filter' : 'Search'}{' '}
            {children === 'Time period' ? 'for popular' : ''} by{' '}
            <span className='capitalize'>{children}</span>
          </p>
          <Menu.Button
            className={`flex items-center justify-center gap-2.5 w-full border border-solid border-accentBase dark:border-greyBase rounded-[20px] bg-whiteBase dark:bg-darkBackground py-2.5 text-accentBase dark:text-whiteBase text-small font-normal group-hover:underline transition-colors `}
            onClick={handleOpenClick}
          >
            {selectedItem || children}
            <SvgIcon
              svgName='icon-arrow-down'
              size={14}
              className={`fill-accentBase dark:fill-whiteBase transition-transform ${
                open ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </Menu.Button>
          <Transition
            show={open}
            enter='transition-transform ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition-transform ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          ></Transition>
          <CustomScrollBar
            isOpen={open}
            orientation='vertical'
            className={`flex absolute ${
              children === 'Time period' ? 'max-h-[225px]' : 'h-[225px]'
            } overflow-hidden z-40 w-full  bg-dropdownBase dark:bg-darkDropdown rounded-[5px] py-[10px] shadow-card dark:shadow-darkCard`}
          >
            <Menu.Items>
              <div className='grid gap-1.5 h-full'>
                {labels?.map((item, index) => (
                  <Menu.Item key={index}>
                    {({ active }) => (
                      <button
                        type='button'
                        className={`${
                          active ? 'underline' : ''
                        } text-accentBase dark:text-whiteBase text-small text-left tracking-wide px-3.5`}
                        onClick={() => handleItemClick(item)}
                      >
                        {item}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </CustomScrollBar>
        </>
      )}
    </Menu>
  );
};

export default Dropdown;
