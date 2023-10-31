import React, { ReactNode, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import SvgIcon from './SvgIcon';

type D = {
  children: ReactNode;
  labels: string[];
  getResults: (value: string) => void;
};

const Dropdown = ({ children, labels, getResults }: Partial<D>) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);

  const handleOpenClick = () => {
    setIsOpenDropdown(!isOpenDropdown);
  };

  const handleItemClick = (item: string) => {
    if (getResults) getResults(item);
    setIsOpenDropdown(false);
  };

  return (
    <Menu as='div' className='relative'>
      {({ open }) => (
        <>
          <Menu.Button
            className={`flex items-center justify-center gap-2.5 w-full border border-solid border-accentBase rounded-[20px] bg-whiteBase py-2.5 text-accentBase text-small font-normal group-hover:underline transition-colors `}
            onClick={handleOpenClick}
          >
            {children}
            <SvgIcon
              svgName={isOpenDropdown ? 'icon-arrow-up' : 'icon-arrow-down'}
              size={14}
              className='fill-accentBase'
            />
          </Menu.Button>
          <Transition
            show={open}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          ></Transition>
          <Menu.Items className='absolute z-30 w-56 max-h-96 overflow-auto flex flex-col bg-dropdownBase rounded-[20px] py-3.5 space-y-3'>
            {labels?.map((item, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <button
                    type='button'
                    className={`${
                      active ? 'underline' : ''
                    } text-accentBase text-small text-left tracking-wide px-3.5`}
                    onClick={() => handleItemClick(item)}
                  >
                    {item}
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </>
      )}
    </Menu>
  );
};

export default Dropdown;
