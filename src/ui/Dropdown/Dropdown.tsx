import React, { FC } from 'react';
import { Menu, Transition } from '@headlessui/react';

import type { SearchParamsObject } from 'types';

import CustomScrollBar from '../CustomScrollBar/CustomScrollBar';
import SvgIcon from '../SvgIcon/SvgIcon';

interface DropdownProps {
  label: string;
  options: string[] | undefined;
  selectedItem: string;
  getResults: (value: string) => void;
  onSelectItem: (value: string, key: keyof SearchParamsObject | string) => void;
}

const Dropdown: FC<DropdownProps> = ({
  label,
  options,
  selectedItem,
  getResults,
  onSelectItem,
}) => {
  const handleItemClick = (item: string): void => {
    if (getResults) getResults(item);
    onSelectItem(
      item,
      label === 'Category' ? 'category' : label === 'Time period' ? 'period' : item,
    );
  };

  const buttonStyle =
    'flex w-full items-center justify-center gap-2.5 rounded-[20px] border border-solid border-accentBase bg-whiteBase py-2.5 text-small font-normal text-accentBase transition-colors group-hover:underline group-focus:underline dark:border-greyBase dark:bg-darkBackground dark:text-whiteBase lg:text-medium';

  return (
    <Menu as='div' className='relative space-y-2'>
      {({ open }) => (
        <>
          <p className='text-base text-darkBase dark:text-greyAlt lg:text-medium'>
            {label === 'Type' ? 'Filter' : 'Search'} {label === 'Time period' ? 'for popular' : ''}
            by <span className='capitalize'>{label}</span>
          </p>
          <Menu.Button className={buttonStyle}>
            {selectedItem || label}
            <SvgIcon
              svgName='arrow'
              sizeKey='xsIcon14'
              className={`fill-accentBase transition-transform dark:fill-whiteBase ${
                open ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </Menu.Button>
          {open && (
            <CustomScrollBar
              isOpen={open}
              orientation='vertical'
              className={`!absolute flex ${
                label === 'Time period' ? 'max-h-225px' : 'h-225px'
              } z-40 w-full overflow-hidden rounded-[20px] bg-dropdownBase py-[10px] shadow-card dark:bg-darkDropdown dark:shadow-darkCard`}
            >
              <Transition
                show={open}
                enter='transition-transform ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition-transform ease-in duration-100'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items unmount>
                  <div className='grid h-full gap-2.5'>
                    {options?.map((item, index) => (
                      <Menu.Item key={index}>
                        {({ active }) => (
                          <button
                            type='button'
                            className={`px-3.5 text-left text-base tracking-wide text-accentBase dark:text-whiteBase lg:text-medium ${
                              active ? 'underline' : ''
                            }`}
                            onClick={() => handleItemClick(item)}
                          >
                            {item}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </CustomScrollBar>
          )}
        </>
      )}
    </Menu>
  );
};

export default Dropdown;
