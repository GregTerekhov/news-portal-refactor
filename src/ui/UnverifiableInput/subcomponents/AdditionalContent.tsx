import React from 'react';

import { VariantInputs } from 'types';
import SvgIcon from '../../SvgIcon/SvgIcon';

export const generateLabelText = (variant: string, name?: string): JSX.Element => {
  return variant === VariantInputs.FilterServiceBlock ? (
    <span className='block text-base text-darkBase dark:text-greyAlt lg:text-medium'>
      {name === 'query' ? 'Search' : 'Filter'} by {name}:
    </span>
  ) : (
    <span className='font-medium text-accentBase hg:text-medium'>Remember me</span>
  );
};

export const showCheckbox = (variant: string, isChecked?: boolean): JSX.Element | null => {
  return variant === VariantInputs.Checkbox ? (
    <SvgIcon
      svgName='check'
      sizeKey='xsIcon16'
      className={isChecked ? 'fill-whiteBase' : 'fill-none'}
    />
  ) : null;
};

export const showIcon = (
  hasIcon: boolean,
  svgFill?: string,
  svgName?: string,
): JSX.Element | null => {
  return hasIcon ? (
    <SvgIcon
      svgName={svgName}
      sizeKey='smIcon20'
      className={`${svgFill} absolute left-3 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center`}
    />
  ) : null;
};
