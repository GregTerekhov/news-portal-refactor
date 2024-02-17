import React, { FC, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';

import { ICON_SIZES } from 'constants/iconSizes';
import { SearchParamsObject } from 'hooks/useAdditionalRequest';

import CustomScrollBar from './CustomScrollBar';
import SvgIcon from './SvgIcon';

interface DropdownProps {
  label: string;
  options: string[] | undefined;
  getResults: (value: string) => void;
  selectedItem: string;
  onSelectItem: (key: keyof SearchParamsObject | 'type', value: string) => void;
}

const Dropdown: FC<DropdownProps> = ({
  label,
  options,
  getResults,
  selectedItem,
  onSelectItem,
}) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);

  const handleOpenClick = (): void => {
    setIsOpenDropdown(!isOpenDropdown);
  };

  const handleItemClick = (item: string): void => {
    if (getResults) getResults(item);
    onSelectItem(
      label === 'Category' ? 'category' : label === 'Time period' ? 'period' : 'type',
      item,
    );
    setIsOpenDropdown(false);
  };

  return (
    <Menu as='div' className='relative'>
      {({ open }) => (
        <>
          <p className='mb-2 text-base text-darkBase dark:text-greyAlt'>
            {label === 'Type' ? 'Filter' : 'Search'} {label === 'Time period' ? 'for popular' : ''}{' '}
            by <span className='capitalize'>{label}</span>
          </p>
          <Menu.Button
            className={`flex w-full items-center justify-center gap-2.5 rounded-[20px] border border-solid border-accentBase bg-whiteBase py-2.5 text-small font-normal text-accentBase transition-colors group-hover:underline dark:border-greyBase dark:bg-darkBackground dark:text-whiteBase `}
            onClick={handleOpenClick}
          >
            {selectedItem || label}
            <SvgIcon
              svgName='icon-arrow-down'
              size={ICON_SIZES.xsIcon14}
              className={`fill-accentBase transition-transform dark:fill-whiteBase ${
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
            className={`absolute flex ${
              label === 'Time period' ? 'max-h-225px' : 'h-225px'
            } z-40 w-full overflow-hidden  rounded-[20px] bg-dropdownBase py-[10px] shadow-card dark:bg-darkDropdown dark:shadow-darkCard`}
          >
            <Menu.Items>
              <div className='grid h-full gap-1.5'>
                {options?.map((item, index) => (
                  <Menu.Item key={index}>
                    {({ active }) => (
                      <button
                        type='button'
                        className={`${
                          active ? 'underline' : ''
                        } px-3.5 text-left text-small tracking-wide text-accentBase dark:text-whiteBase`}
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
