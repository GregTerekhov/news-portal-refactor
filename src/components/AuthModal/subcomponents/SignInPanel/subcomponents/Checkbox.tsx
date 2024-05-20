import React, { FC } from 'react';

import { IconName, IconSizes, InputName, InputType } from 'types';

import { SvgIcon } from 'ui';

interface ICheckboxProps {
  isChecked: boolean;
  handleCheckboxChange: (
    event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => Promise<void>;
}

const Checkbox: FC<ICheckboxProps> = ({ isChecked, handleCheckboxChange }) => {
  return (
    <div className='flex gap-x-4'>
      <div
        className={`${isChecked ? 'bg-accentBase dark:border-whiteBase' : 'bg-whiteBase dark:border-whiteBase'} flex h-6 w-6 cursor-pointer items-center justify-center rounded-sm border border-solid border-accentBase transition-colors duration-500`}
        onClick={handleCheckboxChange}
      >
        <SvgIcon
          svgName={IconName.Check}
          sizeKey={IconSizes.smIcon21}
          className={isChecked ? 'fill-whiteBase' : 'hidden fill-none'}
        />
        <input
          id='checkbox'
          name={InputName.Checkbox}
          type={InputType.Checkbox}
          checked={isChecked}
          className='sr-only'
          onChange={handleCheckboxChange}
        />
      </div>
      <label
        htmlFor='checkbox'
        className='inline-flex cursor-pointer font-medium text-accentBase hg:text-medium'
      >
        Remember me
      </label>
    </div>
  );
};

export default Checkbox;
