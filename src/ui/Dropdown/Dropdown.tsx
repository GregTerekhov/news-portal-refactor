import React, { FC } from 'react';
import { Menu, Transition } from '@headlessui/react';

import {
  ButtonType,
  IconName,
  IconSizes,
  ScrollOrientation,
  type DropdownType,
  type SearchParamsObject,
} from 'types';

import { CustomScrollBar, SvgIcon } from '..';

import { ReadonlyMaterialTypes, ReadonlyPeriodType } from 'constants/dropdownArrays';
import {
  buttonStyle,
  getItemKey,
  getLabelText,
  getMenuButtonIconStyles,
  getMenuItemStyles,
  scrollBarStyles,
} from './assistants';

interface IDropdownProps {
  label: DropdownType;
  options: string[] | ReadonlyMaterialTypes | ReadonlyPeriodType;
  selectedItem: string;
  getResults: (value: string) => void;
  onSelectItem: (value: string, key: keyof SearchParamsObject | string) => void;
}

const Dropdown: FC<IDropdownProps> = ({
  label,
  options,
  selectedItem,
  getResults,
  onSelectItem,
}) => {
  const handleItemClick = (item: string): void => {
    if (getResults) {
      getResults(item);
    }
    const key = getItemKey(label, item);
    onSelectItem(item, key);
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
            <SvgIcon
              svgName={IconName.Arrow}
              sizeKey={IconSizes.xsIcon14}
              className={getMenuButtonIconStyles(open)}
            />
          </Menu.Button>
          {open && (
            <CustomScrollBar
              isOpen={open}
              orientation={ScrollOrientation.Vertical}
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
                      options.map((item) => (
                        <Menu.Item key={item}>
                          {({ active }) => (
                            <button
                              type={ButtonType.Button}
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
