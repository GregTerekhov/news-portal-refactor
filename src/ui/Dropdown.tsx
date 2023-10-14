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
    <Menu>
      <Menu.Button
        className='flex items-center justify-center gap-2.5 w-full border border-solid border-accentBase rounded-[20px] bg-whiteBase py-2 text-accentBase text-small font-normal group-hover:border-whiteBase group-hover:bg-accentBase group-hover:text-whiteBase transition-colors'
        onClick={handleClick}
      >
        {children}
        <SvgIcon
          svgName={isOpenDropdown ? 'icon-arrow-up' : 'icon-arrow-down'}
          size={14}
          fill='#4440f6'
        />
      </Menu.Button>
    </Menu>
  );
};

export default Dropdown;
