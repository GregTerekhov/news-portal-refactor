import React, { FC } from 'react';
import { Menu, Transition } from '@headlessui/react';

import type { SearchParamsObject } from 'types';

import CustomScrollBar from '../CustomScrollBar/CustomScrollBar';
import SvgIcon from '../SvgIcon/SvgIcon';

import {
  buttonStyle,
  getLabelText,
  getMenuButtonIconStyles,
  getMenuItemStyles,
  scrollBarStyles,
} from './assistants';

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

  return (
    <Menu as='div' className='relative space-y-2'>
      {({ open }) => (
        <>
          <p className='text-base text-darkBase dark:text-greyAlt lg:text-medium'>
            {getLabelText(label)}
          </p>
          <Menu.Button className={buttonStyle}>
            {selectedItem || label}
            <SvgIcon svgName='arrow' sizeKey='xsIcon14' className={getMenuButtonIconStyles(open)} />
          </Menu.Button>
          {open && (
            <CustomScrollBar
              isOpen={open}
              orientation='vertical'
              className={scrollBarStyles(label)}
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
                    {Array.isArray(options) &&
                      options.map((item, index) => (
                        <Menu.Item key={index}>
                          {({ active }) => (
                            <button
                              type='button'
                              className={getMenuItemStyles(active)}
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
