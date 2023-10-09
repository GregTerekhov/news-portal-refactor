import React, { useState } from 'react';
import SvgIcon from './SvgIcon';
import CategoriesDropDown from './CategoriesDropDown';

type PrimaryButtCommon = {
  name: string;
  type: 'button' | 'submit' | 'reset';
  hasIcon: boolean;
};

const PrimaryButton = (data: PrimaryButtCommon) => {
  const [categories, setCategories] = useState<boolean>(false);
  const { name, type, hasIcon } = data;

  const onHandleClick = () => {
    setCategories(!categories);
  };

  return (
    <div className='flex-col relative'>
      <button
        className='bg-accentBase rounded-full text-contrastWhite px-6 py-2 flex items-center gap-2.5'
        type={type}
        onClick={onHandleClick}
      >
        {name}
        {hasIcon && (
          <SvgIcon
            svgName='icon-arrow-down'
            size={16}
            stroke='stroke-none'
            fill='fill-contrastWhite'
          />
        )}
      </button>
      {categories && <CategoriesDropDown />}
    </div>
  );
};

export default PrimaryButton;
