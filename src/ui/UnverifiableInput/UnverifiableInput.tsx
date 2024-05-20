import React, { FC } from 'react';

import { IconName, IconSizes, InputName, InputType, VariantsPlaceholder } from 'types';

import { SvgIcon } from '..';

interface InputCollectedData {
  name: InputName;
  type: InputType;
  placeholder?: VariantsPlaceholder;
  value?: string;
}

interface InputProps {
  inputData: InputCollectedData;
  hasIcon: boolean;
  svgName?: IconName;
  touched?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UnverifiableInput: FC<InputProps> = ({ inputData, hasIcon, svgName, onChange }) => {
  const { name, type, value, placeholder } = inputData ?? {};

  const inputFieldStyles = `border border-solid outline-0 transition-colors duration-500 focus:outline-0 w-full py-2 pl-11 pr-3 placeholder:text-darkBase/[.4] dark:placeholder:text-whiteBase/[.4] border-accentBase dark:border-greyBase bg-whiteBase dark:bg-darkBackground $caret-accentBase dark:caret-whiteBase text-accentBase dark:text-whiteBase rounded-3xl font-header text-small leading-mediumRelaxed tracking-bigWide md:text-base md:leading-moreRelaxed md:tracking-wide lg:text-medium`;

  return (
    <label htmlFor={name} className='relative block space-y-2'>
      <span className='block text-base text-darkBase dark:text-greyAlt lg:text-medium'>
        {name === InputName.Query ? 'Search' : 'Filter'} by {name}:
      </span>
      {hasIcon ? (
        <SvgIcon
          svgName={svgName}
          sizeKey={IconSizes.smIcon20}
          className='absolute bottom-3 left-3 fill-accentBase'
        />
      ) : null}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete='off'
        className={inputFieldStyles}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event)}
      />
    </label>
  );
};

export default UnverifiableInput;
