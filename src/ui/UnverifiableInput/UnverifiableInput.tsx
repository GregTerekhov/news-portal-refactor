import React, { FC } from 'react';

import { VariantInputs } from 'types';

import SvgIcon from '../SvgIcon/SvgIcon';

import { generateInputStyles } from './assistants';

interface InputCollectedData {
  name: string;
  type: string;
  placeholder: string;
  value: string;
}

interface InputProps {
  inputData?: Partial<InputCollectedData>;
  isChecked?: boolean;
  hasIcon: boolean;
  svgName?: string;
  variant: VariantInputs;
  hideInput?: (event: React.MouseEvent<HTMLInputElement>) => void;
  touched?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UnverifiableInput: FC<InputProps> = ({
  inputData,
  hasIcon,
  svgName,
  isChecked,
  variant,
  hideInput,
  onChange,
}) => {
  const { name, type, value, placeholder } = inputData ?? {};

  const onHideInput = (event: React.MouseEvent<HTMLInputElement>): void => {
    if (hideInput) {
      hideInput(event);
    }
  };

  const styles = generateInputStyles();
  const {
    labelCheckbox,
    svgFill,
    inputGeometry,
    placeholderColor,
    inputBg,
    inputBorder,
    caretColor,
    checkboxStyles,
    textColor,
  } = styles[variant];

  const inputFieldStyles = `${inputGeometry} rounded-3xl border border-solid font-header text-small leading-mediumRelaxed tracking-bigWide outline-0 transition-colors duration-500 focus:outline-0 md:text-base md:leading-moreRelaxed md:tracking-wide lg:text-medium ${placeholderColor} ${inputBorder} ${inputBg} ${caretColor} ${textColor} ${checkboxStyles}`;

  const labelClass = `block ${variant === VariantInputs.Checkbox ? labelCheckbox : 'mb-2'}`;

  const inputWrapperClass = `relative ${
    variant === VariantInputs.Checkbox
      ? `flex items-center justify-center h-4 w-4 cursor-pointer rounded-sm border border-solid md:h-6 md:w-6 ${
          isChecked ? 'border-whiteBase bg-accentBase' : 'border-accentBase bg-whiteBase'
        }`
      : ''
  }`;

  const generateLabelText = (): JSX.Element => {
    return variant === VariantInputs.FilterServiceBlock ? (
      <span className='block text-base text-darkBase dark:text-greyAlt lg:text-medium'>
        {name === 'query' ? 'Search' : 'Filter'} by {name}:
      </span>
    ) : (
      <span className='font-medium text-accentBase hg:text-medium'>Remember me</span>
    );
  };

  const showCheckbox = (): JSX.Element | null => {
    return variant === VariantInputs.Checkbox ? (
      <SvgIcon
        svgName='check'
        sizeKey='xsIcon16'
        className={`${isChecked ? 'fill-whiteBase' : 'fill-none'}`}
      />
    ) : null;
  };

  const showIcon = (): JSX.Element | null => {
    return hasIcon ? (
      <SvgIcon
        svgName={svgName}
        sizeKey='smIcon20'
        className={`${svgFill} absolute left-3 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center`}
      />
    ) : null;
  };

  return (
    <div className={variant === VariantInputs.Checkbox ? 'flex items-center gap-x-2' : ''}>
      <label htmlFor={name} className={labelClass}>
        {generateLabelText()}
      </label>
      <div className={inputWrapperClass}>
        {showCheckbox()}
        {showIcon()}
        <input
          className={inputFieldStyles}
          id={name}
          name={name}
          type={type}
          value={value}
          checked={isChecked}
          placeholder={placeholder}
          autoComplete='off'
          onClick={onHideInput}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            if (onChange) {
              onChange(event);
            }
          }}
        />
      </div>
    </div>
  );
};

export default UnverifiableInput;
